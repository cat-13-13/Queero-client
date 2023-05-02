/* eslint-disable import/no-extraneous-dependencies */
import React, { Component } from 'react';
import VerticalNavigation from 'react-rainbow-components/components/VerticalNavigation';
import VerticalSection from 'react-rainbow-components/components/VerticalSection';
import VerticalSectionOverflow from 'react-rainbow-components/components/VerticalSectionOverflow';
import VerticalItem from 'react-rainbow-components/components/VerticalItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faHome, faShoppingCart, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import { SidebarItem } from 'react-rainbow-components';
import { Link } from 'react-router-dom';

export default class SideNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 'item-7',
        };
        this.handleOnSelect = this.handleOnSelect.bind(this);
    }

    handleOnSelect(e, selectedItem) {
        return this.setState({ selectedItem });
    }

    render() {
        return (
            <aside className="d-flex flex-column justify-between vertical-navigation ">
                <VerticalNavigation
                    selectedItem={this.state.selectedItem}
                    onSelect={this.handleOnSelect}>

                    <Link to='./' ><SidebarItem icon={<FontAwesomeIcon size="lg" icon={faHome} />} name="Home" label="Home" /></Link>
                    <Link to='./countries' ><SidebarItem icon={<FontAwesomeIcon size="lg" icon={faHome} />} name="Countries" label="Countries" /></Link>
                    <Link to='./posts' ><SidebarItem icon={<FontAwesomeIcon size="lg" icon={faHome} />} name="Posts" label="Posts" /></Link>
                    {/* <Link to={ } ><SidebarItem icon={<FontAwesomeIcon size="lg" icon={faHome} />} name="Messages" label="Messages" /></Link> */}
                    {/* <Link to={ } ><SidebarItem icon={<FontAwesomeIcon size="lg" icon={faHome} />} name="Charts" label="Charts" /></Link> */}

                </VerticalNavigation>
            </aside>
        );
    }
}
