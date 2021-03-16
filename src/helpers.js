import React, { Component } from 'react';
import { shape, bool, string, object } from 'prop-types';
import { mockData, defaultConfig } from './helper/config';

// Declaring as a function makes it hoisted and don't mess with constructor from React.Component
export function withHelper({ WrappedComponent, willMock = false }) {
  return class withConfig extends Component {
    static defaultProps = {
      mockData: willMock ? mockData : null,
      config: defaultConfig,
    };

    static propTypes = {
      config: shape({
        showSetup: bool.isRequired,
        color: string.isRequired,
        characterName: string.isRequired,
        showDuration: bool.isRequired,
        showTotalDps: bool.isRequired,
        showHps: bool.isRequired,
        showJobIcon: bool.isRequired,
        showRank: bool.isRequired,
        showDamagePercent: bool.isRequired,
        showJobless: bool.isRequired,
        zoom: string.isRequired,
        configWindow: object.isRequired,
      }),
    };

    state = { ...this.props };

    UNSAFE_componentWillMount() {
      window.addEventListener('storage', this.updateState, false);
      this.updateState();
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.updateState();
    }

    UNSAFE_componentWillUpdate(nextProps, nextState, nextContext) {
      window.removeEventListener('storage', this.updateState);
    }

    updateState = () => {
      const configStore = localStorage.getItem('horizoverlay');
      if (!configStore) {
        const config = this.props.config;
        localStorage.setItem('horizoverlay', JSON.stringify(config));
        this.setState({ config });
      } else {
        const config = JSON.parse(configStore);
        this.setState({ config });
      }
    };

    openConfig = () => {
      this.setState({ isConfigOpen: true });

      const windowFeatures = `menubar=no,location=no,resizable=no,scrollbars=yes,status=no,width=${this.props.config.configWindow.width},height=${this.props.config.configWindow.height}`;
      this.configWindow = window.open('./#/config', 'Horizoverlay Config', windowFeatures);
      this.configWindow.focus();
      this.configWindow.onbeforeunload = () => {
        this.setState({ isConfigOpen: false });
        this.configWindow = null;
      };
    };

    render = () => {
      const { Combatant, Encounter, isActive } = this.props;
      return (
        <WrappedComponent
          {...this.state}
          Combatant={Combatant}
          Encounter={Encounter}
          isActive={isActive}
          openConfig={this.openConfig}
          handleReset={this.updateState}
        />
      );
    };
  };
}
