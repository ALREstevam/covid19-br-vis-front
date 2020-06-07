import React, { Component } from 'react';
import { Tabs, TabItem, TabsContent, TabPanel } from 'react-foundation'


export default class ChartTabs extends Component {
    constructor() {
        super();
        this.state = {
            activeIndex: 0
        }
    }

    formatTitleToUrl(text){
        return text.toLowerCase().split(' ').join('-')
    }

    openTab = (index) => {
        if(index !== this.state.activeIndex){
            this.setState({ activeIndex: index })
            this.props.onSelectedChanged && 
                this.props.onSelectedChanged(index, this.props.tabTitles[index])
        }
    }

    componentDidMount(){
        this.openTab(this.props.selectedIndex)
    }

    render() {
        return (
            <div>
                <link rel='stylesheet' type='text/css'
                    href='https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.1/css/foundation-float.min.css' />
                <Tabs>
                    {this.props.tabTitles.map((title, index) => (
                        <TabItem isActive={this.state.activeIndex === index}
                            key={`tabitem-key-${title}-${index}`}
                            className='tabTitle'
                            onClick={(e) => this.openTab(index)}>
                            <a href={`#tab-${this.formatTitleToUrl(title)}`}>{title}</a>
                        </TabItem>)
                    )}
                </Tabs>
                <TabsContent>

                    {this.props.children.map((Element, index) => (
                        <TabPanel 
                            key={`tabpanel-key-${this.props.tabTitles[index]}-${index}`}
                            id={`tab-${this.formatTitleToUrl(this.props.tabTitles[index])}`} 
                            isActive={this.state.activeIndex === index}
                            style={{ width: '100%', minHeight: '100vh' }}>
                            {(!this.props.renderIfSelectedOnly || (
                                this.props.renderIfSelectedOnly === true 
                                && this.state.index  === index
                            )) &&
                                Element}
                        </TabPanel>
                    ))}

                </TabsContent>
            </div>
        )
    }
}