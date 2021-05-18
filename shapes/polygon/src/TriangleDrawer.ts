import { ISide, PolygonDrawerBase } from "./PolygonDrawerBase";
import type { ICoordinates, IParticle } from "tsparticles-engine";

/**
 * @category Shape Drawers
 */
export class TriangleDrawer extends PolygonDrawerBase {
    getSidesCount(): number {
        return 3;
    }

    getSidesData(particle: IParticle, radius: number): ISide {
        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };
    }

    getCenter(particle: IParticle, radius: number): ICoordinates {
        return {
            x: -radius,
            y: radius / 1.66,
        };
    }
}