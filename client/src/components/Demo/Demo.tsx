import React from 'react';
import "./Demo.scss";

interface Props {
    onDismiss: Function;
}
 
class Demo extends React.Component<Props> {
  render() {
    const { onDismiss } = this.props;
    return (
        <section className="Demo" onClick={() => onDismiss()}><div>
            DEMO! Entra con:<br />
            <strong>
                alfa<br />
                beta<br />
                gamma<br />
                delta<br />
                epsilon<br />
                zeta<br />
                theta<br />
                iota<br />
                kappa<br />
                lamda<br />
                omega<br />
                sigma
            </strong>
        </div></section>
    );
  }
}

export default Demo;