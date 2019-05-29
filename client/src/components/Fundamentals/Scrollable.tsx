import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from '@inlet/react-pixi'
import Interactive from './Interactive';

interface Props {
    app: any;
    onClick?: Function;
    onSelect?: Function;
    onSelectStop?: Function;
    onMoveStart?: Function;
    onMove?: Function;
    disabled?: boolean;
}

interface State {
}

var $dragger = {
    start: {},
    drag: 1
} as any;

export default class Scrollable extends React.Component<Props, State> {
    // private
    $container: any;

    render() {
        const { children, app, onClick, onSelect, onSelectStop, onMoveStart, onMove, disabled = false } = this.props;

        const interactiveProps = {
          app,
          onDoubleTap: ((e: any) => {
            const current = { x: this.$container.x, y: this.$container.y };
            if (onClick) onClick({ x: e.x - current.x, y: e.y - current.y });
          }),
          onMoveStart: ((e: any) => {
            const { disabled = false } = this.props;
            if (e.type === "panstart") {
              $dragger.start = { x: e.x, y: e.y };
              const current = { x: this.$container.x, y: this.$container.y };
              if (onMoveStart) onMoveStart({ x: e.x - current.x, y: e.y - current.y });
              return;
            }
          }),
          onMove: ((e: any) => {
            const { disabled = false } = this.props;
            const current = { x: this.$container.x, y: this.$container.y };
            if (onMove) onMove({ x: e.x - current.x, y: e.y - current.y });

            // pan container
            const delta = { x: e.x - $dragger.start.x, y: e.y - $dragger.start.y };
            let next = { x: current.x + delta.x / $dragger.drag, y: current.y + delta.y / $dragger.drag };
            $dragger.start = { x: e.x, y: e.y };
            // bound
            if (next.x > 0) next.x = 0;
            if (next.y > 0) next.y = 0;
            // apply
            if (disabled) return;
            this.$container.x = next.x;
            this.$container.y = next.y;
          }),
          onMoveEnd: ((e: any) => {
            if (onSelectStop) onSelectStop();
          }),
          /*
          onPress: ((e: any) => {
            const current = { x: this.$container.x, y: this.$container.y };
            if (onSelect) onSelect({ x: e.x - current.x, y: e.y - current.y });
          }),
          */
        }

        const containerProps = {
            /*interactive: true,
            pointerdown: (e: PIXI.interaction.InteractionEvent) => {
              const { x, y } = e.data.global;
              $dragger.start = { x, y };
            },
            pointermove:  (e: PIXI.interaction.InteractionEvent) => {
              if (!$dragger.start) return;
              const { x, y } = e.data.global; // e.data.getLocalPosition(this.$container); //  //
              const delta = { x: x - $dragger.start.x, y: y - $dragger.start.y };
              const current = { x: this.$container.x, y: this.$container.y };
              let next = { x: current.x + delta.x / $dragger.drag, y: current.y + delta.y / $dragger.drag };
              // bound
              if (next.x > 0) next.x = 0;
              if (next.y > 0) next.y = 0;
              // apply
              this.$container.x = next.x;
              this.$container.y = next.y;
            },
            pointerup: (e: PIXI.interaction.InteractionEvent) => {
              delete $dragger.start;
            },*/
        };
        
        return (
          <Interactive {...interactiveProps}>
            <Container ref={s => this.$container = s} {...containerProps}>{children}</Container>
          </Interactive>
        );
    }
}