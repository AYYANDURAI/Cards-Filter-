import React from 'react';
import Card from '../Card/Card.js';
import axios from 'axios';
import { data } from '../../Data.js';
import './Cards.css';

class Cards extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardList: [],
            cardMenu: [],
            filtered: [],
            checkedItems: [],
            selected: []
        };
    }

    getCardMenus = async () => {
        let url = 'https://raw.githubusercontent.com/DigitalAssetPortal/Sample-Responses/main/benefitDetails.json';
        const menus = await axios.get(url);
        this.setState({ cardMenu: menus.data });
    }

    componentDidMount() {
        this.setState({ cardList: data, filtered: data });
        this.getCardMenus();
    }

    filterBenes = (benes, checked) => {
        let indArr = [];
        for (let i = 0; i < checked.length; i++) {
            let ItemIndex = benes.findIndex(b => b.name === checked[i].name);
            if (ItemIndex !== -1) indArr.push(ItemIndex);
        }
        if (indArr.length === checked.length) return true;

    }

    getFilter = async () => {
        let { checkedItems, cardList } = this.state;
        let filteredData = await cardList.filter(c => this.filterBenes(c.benefitsDetails, checkedItems));
        this.setState({ filtered: filteredData });
        console.log(filteredData);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.checkedItems !== prevState.checkedItems) {
            console.log(this.state.checkedItems);
            this.getFilter();
        }
    }

    filterItems = async (item) => {
        let { checkedItems } = this.state;

        if (this.state.selected.includes(item.id)) {
            let ind = this.state.selected.indexOf(item.id);
            this.state.selected.splice(ind, 1);
        } else {
            var joined = this.state.selected.concat(item.id);
            this.setState({ selected: joined })
        }

        const index = checkedItems ? checkedItems.findIndex(({ name }) => name === item.name) : -1;
        if (index >= 0) {
            checkedItems.splice(index, 1);
            this.setState({
                checkedItems: [...this.state.checkedItems]
            });
        }
        else {
            this.setState({
                checkedItems: [...this.state.checkedItems, item]
            });
        }
    }

    render() {
        return (
            <>
                <div className="btn-container">
                    <button className="btns" onClick={() => this.setState({ filtered: this.state.cardList })}>All</button>
                    {
                        this.state.cardMenu.map((item) => {
                            return (
                                <button className="btns"
                                    key={item.id}
                                    style={{ backgroundColor: this.state.selected.includes(item.id) ? "#c8c8dc" : "" }}
                                    onClick={() => { this.filterItems(item) }}>
                                    {item.name}
                                </button>
                            );
                        })
                    }
                </div>
                <Card cardList={this.state.filtered} />
            </>
        )
    }
}
export default Cards;