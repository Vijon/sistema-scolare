import * as React from "react";
import { route } from "../services/Router";
import { get } from '../services/Config'
import AddHome from '../components/AddHome/AddHome';
import Nav from '../components/Nav/Nav';
import Splash from '../components/Splash/Splash';
import Auth from '../containers/Auth';
import Universe from '../containers/Universe';
import World from '../containers/World';
import MapEditor from '../containers/MapEditor';

interface Props {
  user?: any;
  onLogout?: Function;
}

interface State {
  // UI
  loading: boolean;
  section: "SPLASH" | "AUTH" | "UNIVERSE" | "WORLD" | "EDITOR";
  planet?: any;

  // CONFIG
}

class App extends React.Component<Props, State> {
    state = {
        loading: true,
        section: "SPLASH",
    } as State;

  componentWillReceiveProps( nextProps: Props ) {
  }

  componentWillMount() {
    // config load
    /*api.get("config", {}).then( (res) => {
      const { data } = res.data;
      this.setState({
        country: data.country,
        i18n: data.i18n,
        bases: data.bases,
        layers: data.layers
      });
      initI18n(data.i18n);
    })*/
    // routes
    route.on("auth", () => {
      this.setState({
        section: "AUTH"
      });
    });
    route.on("universe", () => {
      this.guard(() => { this.setState({
        section: "UNIVERSE"
      })});
    });
    route.on("planet", (location: any) => {
      this.guard(() => { this.setState({
        section: "WORLD",
        planet: location.id
      })});
    });
    route.on("editor", () => {
      this.guard(() => { this.setState({
        section: "EDITOR"
      })});
    });

    // loading
    setTimeout( () => {
      this.setState({
        loading: false
      });
    }, 1000);
    
  }

  guard( fn: Function ) {
    const { user } = this.props;
    if (!user) {
      route.goto("auth")
    } else {
      fn();
    }
  }

  render() {
    const { user, onLogout} = this.props;
    const { loading, section, planet } = this.state;
    if (loading) {
      return null; //<Loading />;
    }
    let props = {
    } as any;
    const navProps = {
      onClick: (sect: string) => {
        route.goto(sect)
      },
      onLogout: () => {
        if (onLogout) onLogout();
      },
    }
    switch (section) {
        case 'SPLASH':
            props = { ...props, onDismiss: () => route.goto("universe") };
            return <Splash {...props} />
        break;
        case 'AUTH':
            props = { ...props };
            return <Auth {...props} />
        break;
        case 'UNIVERSE':
            props = { ...props };
            return <><Nav {...navProps} /><Universe {...props} /></>
        break;
        case 'WORLD':
            props = { ...props };
            return <><Nav {...navProps} /><World {...props} id={planet} /></>
        break;
        case 'EDITOR':
            props = { ...props };
            return <><Nav {...navProps} /><MapEditor {...props} id={planet} /></>
        break;
    }
  }
}

export default App;
