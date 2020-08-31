import type { IClickEvent } from "./IClickEvent";
import type { IHoverEvent } from "./IHoverEvent";
import type { IDivEvent } from "./IDivEvent";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";

/**
 * @category Options
 */
export interface IEvents {
    /**
     * @deprecated use the new onClick instead
     */
    onclick: IClickEvent;

    /**
     * @deprecated use the new onHover instead
     */
    onhover: IHoverEvent;

    /**
     * @deprecated use the new onDiv instead
     */
    ondiv: SingleOrMultiple<IDivEvent>;

    onClick: IClickEvent;
    onHover: IHoverEvent;
    onDiv: SingleOrMultiple<IDivEvent>;
    resize: boolean;
}
