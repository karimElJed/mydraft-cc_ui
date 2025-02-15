/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
*/

import { DefaultAppearance, Rect2, RenderContext, ShapePlugin } from '@app/wireframes/interface';
import { CommonTheme } from './_theme';

const DEFAULT_APPEARANCE = {};
DEFAULT_APPEARANCE[DefaultAppearance.FOREGROUND_COLOR] = CommonTheme.CONTROL_TEXT_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.BACKGROUND_COLOR] = CommonTheme.CONTROL_BACKGROUND_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.TEXT] = '43';
DEFAULT_APPEARANCE[DefaultAppearance.TEXT_ALIGNMENT] = 'left';
DEFAULT_APPEARANCE[DefaultAppearance.FONT_SIZE] = CommonTheme.CONTROL_FONT_SIZE;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_COLOR] = CommonTheme.CONTROL_BORDER_COLOR;
DEFAULT_APPEARANCE[DefaultAppearance.STROKE_THICKNESS] = CommonTheme.CONTROL_BORDER_THICKNESS;

export class Numeric implements ShapePlugin {
    public identifier(): string {
        return 'Numeric';
    }

    public defaultAppearance() {
        return DEFAULT_APPEARANCE;
    }

    public defaultSize() {
        return { x: 80, y: 30 };
    }

    public render(ctx: RenderContext) {
        const clickSize = Math.min(40, Math.min(0.8 * ctx.rect.width, ctx.rect.height));

        this.createInputArea(ctx, clickSize);
        this.createText(ctx, clickSize);
        this.createClickArea(ctx, clickSize);
        this.createIncrementer(ctx, clickSize);
        this.createDecrementer(ctx, clickSize);
    }

    private createClickArea(ctx: RenderContext, clickSize: number) {
        const clickAreaRect = new Rect2(ctx.rect.right - clickSize, 0, clickSize, ctx.rect.height);

        ctx.renderer2.roundedRectangleRight(ctx.shape, CommonTheme.CONTROL_BORDER_RADIUS, clickAreaRect, p => {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(ctx.shape);
        });
    }

    private createIncrementer(ctx: RenderContext, clickSize: number) {
        const y = ctx.rect.height * 0.35;
        const x = ctx.rect.right - 0.5 * clickSize;
        const w = clickSize * 0.3;
        const h = clickSize * 0.2;

        const path = `M${x - 0.5 * w},${y} L${x},${y - h},L${x + 0.5 * w},${y} z`;

        ctx.renderer2.path(0, path, undefined, p => {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    }

    private createDecrementer(ctx: RenderContext, clickSize: number) {
        const y = ctx.rect.height * 0.65;
        const x = ctx.rect.right - 0.5 * clickSize;
        const w = clickSize * 0.3;
        const h = clickSize * 0.2;

        const path = `M${x - 0.5 * w},${y} L${x},${y + h},L${x + 0.5 * w},${y} z`;

        ctx.renderer2.path(0, path, undefined, p => {
            p.setBackgroundColor(ctx.shape.strokeColor);
        });
    }

    private createInputArea(ctx: RenderContext, clickSize: number) {
        const inputAreaRect = new Rect2(0, 0, ctx.rect.width - clickSize + 1, ctx.rect.height);

        ctx.renderer2.roundedRectangleLeft(ctx.shape, CommonTheme.CONTROL_BORDER_RADIUS, inputAreaRect, p => {
            p.setStrokeColor(ctx.shape);
            p.setBackgroundColor(0xffffff);
        });
    }

    private createText(ctx: RenderContext, clickSize: number) {
        const textRect =
            new Rect2(14, 4,
                Math.max(0, ctx.rect.width - clickSize - 6),
                Math.max(0, ctx.rect.height - 8));

        ctx.renderer2.text(ctx.shape, textRect, p => {
            p.setForegroundColor(ctx.shape);
        });
    }
}
