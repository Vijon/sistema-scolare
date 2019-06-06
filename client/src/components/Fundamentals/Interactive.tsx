import React from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';

interface Props {
    app: any;
    onMoveStart?: (ev: any) => void
    onMove?: (ev: any) => void
    onMoveEnd?: (ev: any) => void
    onPress?: (ev: any) => void
    onPressEnd?: (ev: any) => void
    onTap?: (ev: any) => void
    onDoubleTap?: (ev: any) => void
}

interface State {
}

var $engine: HammerManager;
export default class Interactive extends React.Component<Props, State> {

    componentWillMount() {
        const $el = this.props.app.view;
        const { onMoveStart, onMove, onMoveEnd, onPress, onPressEnd, onTap, onDoubleTap } = this.props;
        $engine = new Hammer($el);
        
        $engine.on('panstart', (ev) => onMoveStart ? onMoveStart(this.pos(ev)) : null );
        $engine.on('pan', (ev) => onMove ? onMove(this.pos(ev)) : null );
        $engine.on('panend', (ev) => onMoveEnd ? onMoveEnd(this.pos(ev)) : null );
        $engine.on('press', (ev) => onPress ? onPress(this.pos(ev)) : null );
        $engine.on('pressup', (ev) => onPressEnd ? onPressEnd(this.pos(ev)) : null );
        $engine.on('panend', (ev) => onPressEnd ? onPressEnd(this.pos(ev)) : null );
        $engine.on('tap', (ev) => onTap ? onTap(this.pos(ev)) : null );
        $engine.on('doubletap', (ev) => onDoubleTap ? onDoubleTap(this.pos(ev)) : null );

        $engine.get('pan').set({ direction: Hammer.DIRECTION_ALL, threshold: 0 });
    }

    componentWillUnmount() {
        $engine.destroy();
    }

    pos(e: HammerInput) {
        const $el = this.props.app.view;
        const pos = $el.getBoundingClientRect();
        return { ...e, x: e.center.x - pos.left, y: e.center.y - pos.top };
    }

    render() {
        return this.props.children;
    }
}