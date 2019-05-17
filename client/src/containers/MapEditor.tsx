import * as React from "react";
import { connect } from "react-redux";
import { setError, setPlanets } from "../store/actions/app";
import { mergeProps /*, pushPath*/ } from "./helpers";
import { State, User, Error } from "../types";
import Api from "../services/Api";
import { route } from "../services/Router";
import MapEditor from "../components/MapEditor/MapEditor";

const mapStateToProps = (state: State) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onInit: (item: any) => {
            //dispatch(setCurrent(item));
        },
        onAddTile: (args: any) => {
            
        },
    };
};

interface Props {
    user: any;
    onInit: Function;
}

interface ContainerState {
    map: any;
}

class Container extends React.Component<Props, ContainerState> {
    private $debounce: any;
    private $buffer = [] as any;

    state = {} as ContainerState;

    componentDidMount( ) {
        const { user } = this.props;
        this.loadMyPlanet(user.id);
    }

    loadMyPlanet(id: any) {
        const { onInit } = this.props;
        Api.service('users').get(id)
        .then((res) => {
            onInit(res);
            this.setState({map: res.world.map});
        })
        .catch((e: any) => {
        });
    }

    saveTiles( ) {
        const { user } = this.props;
        Api.service('editor').patch(user.id, this.$buffer)
        .then((res) => {
            this.$buffer = [];
        })
        .catch((e: any) => {
        });
    }

    render() {
        const { map } = this.state;
        if (!map) return null;

        const props = {
            ...this.props,
            map,
            onAddTile: (args: any) => {
                this.$buffer.push( args );
                if (this.$debounce) clearTimeout( this.$debounce );
                this.$debounce = setTimeout(() => {
                    this.saveTiles();
                }, 3000);
            }
        }
        return <MapEditor {...props} />
    }
}

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Container);

export default container;
