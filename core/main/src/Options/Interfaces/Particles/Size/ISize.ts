import type { ISizeAnimation } from "./ISizeAnimation";
import type { ISizeRandom } from "./ISizeRandom";

/**
 * @category Options
 */
export interface ISize {
    /**
     * @deprecated use the new animation instead
     */
    anim: ISizeAnimation;

    animation: ISizeAnimation;
    random: boolean | ISizeRandom;
    value: number;
}
