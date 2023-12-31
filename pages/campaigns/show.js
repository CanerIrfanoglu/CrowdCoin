import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from "../../component/Layout.js";
import Campaign from "../../ethereum/campaign.js";
import web3 from '../../ethereum/web3.js';
import ContributeForm from '../../component/ContributeForm.js';
import { Link } from '../../routes';


class CampaignShow extends Component {

	static async getInitialProps(props) {
		const campaign = Campaign(props.query.address);

		const summary = await campaign.methods.getSummary().call();
		return {
			address: props.query.address,
			minimumContribution: Number(summary[0]),
			balance: Number(summary[1]),
			requestsCount: Number(summary[2]),
			approversCount: Number(summary[3]),
			manager: summary[4]
		};
	
	};

	renderCards() {
		const {
			balance,
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = this.props;

		const items = [
			{
				header: manager,
				meta: 'Address of manager',
				description: 'The manager created this campaign and can creates requests to collect funds.',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: minimumContribution,
				meta: 'Minimum Contribution (wei)',
				description: 'You must contribute at least this much to become an approver.',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: requestsCount,
				meta: 'Number of Requests',
				description: 'A request tries to withdraw money from the contract. Needs to be approved by approvers.',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: approversCount,
				meta: 'Number of approvers',
				description: 'Number of who have already donated to this campaign',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: web3.utils.fromWei(balance, 'ether'),
				meta: 'Campaign Balance (ether)',
				description: 'This balance represents how much campaign has left to spend',
				style: { overflowWrap: 'break-word' }
			},

		];

		return <Card.Group items={items} />;
	}

	render () {
		return (
			<Layout>
				<h3>Campaign Show</h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}

						</Grid.Column>
						<Grid.Column width={6}>
							<ContributeForm address={this.props.address}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Link route={`/campaigns/${this.props.address}/requests`}>
								<a>
									<Button primary>View Requests</Button>
								</a>
							</Link>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				
			</Layout>
		)
	}
}

export default CampaignShow;