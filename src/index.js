import React from 'react'
import ReactDOM from 'react-dom'
import DocReady from 'es6-docready'
import Dom from 'es6-dom'
import Picker from './month-picker-jp'


DocReady(function () {

    let MonthBox = React.createClass({
        propTypes: {
            value: React.PropTypes.string
            , onClick: React.PropTypes.func
        }
        , getInitialState() {
            return {
                value: this.props.value || 'N/A'
            }
        }
        , componentWillReceiveProps(nextProps){
            this.setState({
                value: nextProps.value || 'N/A'
            })
        }

        , jpstr() {
            let regex = /(\d{1,2})月\.\s*(\d{4})/
            let str = this.state.value
            let m = str.match(regex)
            if (m) {
                let month = ('00'+m[1]).slice( -2 );
                str = str.replace(m[0], `${m[2]}/${month}`)
            }
            return (str)
        }

        , render() {

            return (
                <div className="box" onClick={this._handleClick}>
                    <label>{this.jpstr()}</label>
                </div>
            )
        }

        , _handleClick(e) {
            this.props.onClick && this.props.onClick(e)
        }
    })


    let List = React.createClass({
        propTypes: {}
        , getDefaultProps () {
            return {}
        }
        , getInitialState() {
            let now = new Date();
            return {
                mvalue: {year: now.getFullYear(), month: 1+now.getMonth()}
            }
        }
        , componentWillReceiveProps(nextProps){
            this.setState({})
        }

        , componentDidMount () {
        }

        , render() {

            let pickerLang = {
                /*months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']*/
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                , from: 'From', to: 'To'
            }
                , mvalue = this.state.mvalue
                /*, mvalue2 = this.state.mvalue2
                , mrange = this.state.mrange
                , mrange2 = this.state.mrange2*/

            let makeText = m => {
                if (m && m.year && m.month) return (pickerLang.months[m.month - 1] + '. ' + m.year)
                return '?'
            }

            let numYears = 10
            let currentYear = new Date().getFullYear()
            let years = Array.from(Array(numYears).keys()).map(e => currentYear - (numYears-1-e))

            return (
                <ul>
                    <li>
                        <label><b>Month Pickerのデモ</b><span>(今年を含む１０年前まで選択可能)</span></label>
                        <div className="edit">
                            <Picker
                                ref="pickAMonth"
                                years={years}
                                value={mvalue}
                                lang={pickerLang.months}
                                onChange={this.handleAMonthChange}
                                onDismiss={this.handleAMonthDissmis}
                            >
                                <MonthBox value={makeText(mvalue)} onClick={this.handleClickMonthBox}/>
                            </Picker>
                        </div>
                    </li>
                </ul>
            )
        }

        , handleClickMonthBox(e) {
            this.refs.pickAMonth.show()
        }
        , handleAMonthChange(value, text) {
            //
        }
        , handleAMonthDissmis(value) {
            this.setState({mvalue: value})
        }

        , handleClickMonthBox2(e) {
            this.refs.pickAMonth2.show()
        }
        , handleAMonthChange2(value, text) {
            //
        }
        , handleAMonthDissmis2(value) {
            this.setState({mvalue2: value})
        }

        , _handleClickRangeBox(e) {
            this.refs.pickRange.show()
        }
        , handleRangeChange(value, text, listIndex) {
            //
        }
        , handleRangeDissmis(value) {
            this.setState({mrange: value})
        }

        , _handleClickRangeBox2(e) {
            this.refs.pickRange2.show()
        }
        , handleRangeChange2(value, text, listIndex) {
            //
        }
        , handleRangeDissmis2(value) {
            this.setState({mrange2: value})
        }
    })


    let Main = React.createClass({
        propTypes: {
            value: React.PropTypes.string
            , onClick: React.PropTypes.func
        }
        , getInitialState() {
            return {
                value: this.props.value
            }
        }
        , componentWillReceiveProps(nextProps){
            this.setState({
                value: nextProps.value
            })
        }

        , render() {

            return (
                <div className="list-area">
                    <List />
                </div>
            )
        }
    })


    ReactDOM.render(
        <Main/>
        , Dom.nodeById("page-container"))


})
