import { connect } from "react-redux";
import { setError, setPlanets, setVisitingPlanet, resetCurrent } from "../store/actions/app";
import { mergeProps /*, pushPath*/ } from "./helpers";
import { State, User, Error } from "../types";
import Api from "../services/Api";
import { route } from "../services/Router";
import Universe from "../components/Universe/Universe";
import { get } from "../services/Config";

const mapStateToProps = (state: State) => {
    return {
        user: state.user,
        planets: state.planets,
        visiting: state.visiting
    };
};


export const Size = {
    width: get('universe_width'),
    height: get('universe_height')
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        onInit: (text: string) => {
            dispatch(resetCurrent());
            Api.service('users').find({
            })
            .then((res) => {
                // transform in planet ;)
                const planets = res.map( (r: any) => {
                    const { x, y, z } = r.world.pos;
                    return {
                        id: r.id,
                        name: r.name,
                        pos: { x: x*Size.width/100, y: y*Size.height/100, z },
                        type: r.world.planet
                    }
                })
                dispatch(setPlanets(planets));
            })
            .catch((e: any) => {
                dispatch(setError(e));
            });
        },
        onGoto: (id: any) => {
            route.goto(`planet/${id}`);
            dispatch(setVisitingPlanet(id));
        },
        onError: (err: Error) => {
            dispatch(setError(err));
        }
    };
};

const container = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Universe);

export default container;
