import React, {Component} from 'react';
import { Menu } from 'semantic-ui-react';

export default () => {
    return (
      <Menu>
        <Menu.Item header>Crowd Coin</Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            Campaigns
          </Menu.Item>
          <Menu.Item>
            +
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
}