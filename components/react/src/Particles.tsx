import React, { Component, MutableRefObject, ReactNode } from "react";
import type { IOptions } from "tsparticles/dist/Options/Interfaces/IOptions";
import { Container } from "tsparticles/dist/Core/Container";
import type { RecursivePartial } from "tsparticles/dist/Types/RecursivePartial";
import { tsParticles } from "tsparticles";
import { isEqual } from "lodash";
import type { IParticlesProps } from "./IParticlesProps";
import type { IParticlesState } from "./IParticlesState";

export default class Particles extends Component<IParticlesProps, IParticlesState> {
    public static defaultProps: IParticlesProps = {
        width: "100%",
        height: "100%",
        options: {},
        style: {},
        id: "tsparticles",
    };

    constructor(props: IParticlesProps) {
        super(props);

        this.state = {
            canvas: undefined,
            library: undefined,
        };

        this.loadCanvas = this.loadCanvas.bind(this);
    }

    public destroy(): void {
        if (!this.state.library) {
            return;
        }

        this.state.library.destroy();

        this.setState({
            library: undefined,
        });
    }

    public loadCanvas(canvas: HTMLCanvasElement): void {
        if (!canvas) {
            return;
        }

        this.setState(
            {
                canvas,
            },
            () => {
                const { library } = this.state;

                if (!library) {
                    return;
                }

                library.canvas.loadCanvas(canvas);
                library.start();
            }
        );
    }

    public shouldComponentUpdate(nextProps: Readonly<IParticlesProps>): boolean {
        return !isEqual(nextProps, this.props);
    }

    public componentDidUpdate(): void {
        this.refresh(this.props);
    }

    public forceUpdate(): void {
        this.refresh(this.props);
        super.forceUpdate();
    }

    public componentDidMount(): void {
        this.setState({
            library: this.buildParticlesLibrary(this.props.id, this.props.params ?? this.props.options),
        });
    }

    public componentWillUnmount(): void {
        this.destroy();
    }

    public render(): ReactNode {
        const { width, height, className, canvasClassName, id } = this.props;
        return (
            <div className={className} id={id}>
                <canvas
                    ref={this.loadCanvas}
                    className={canvasClassName}
                    style={{
                        ...this.props.style,
                        width,
                        height,
                    }}
                />
            </div>
        );
    }

    private buildParticlesLibrary(tagId: string, options?: RecursivePartial<IOptions>): Container | null {
        try {
            if (window === undefined) return null;
        } catch {
            return null;
        } // SSR

        tsParticles.init();

        const container = new Container(tagId, options);

        if (this.props.container) {
            (this.props.container as MutableRefObject<Container>).current = container;
        }

        return container;
    }

    private refresh(props: Readonly<IParticlesProps>): void {
        const { canvas } = this.state;

        if (!canvas) {
            return;
        }

        this.destroy();

        this.setState(
            {
                library: this.buildParticlesLibrary(props.id, props.params ?? props.options),
            },
            () => {
                this.loadCanvas(canvas);
            }
        );
    }
}
