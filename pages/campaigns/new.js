import React, {Component} from 'react';
import { Input, Form, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  state = {
    minimumContribution: 0
  };

  render() {
    return (
      <Layout>
      <h3>
        Create a Campaign
      </h3>
        <Form>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input label="wei" labelPosition="right" value={this.state.minimumContribution} onChange={event => this.setState({minimumContribution: event.target.value})} />
          </Form.Field>
          <Button primary>Create!</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
