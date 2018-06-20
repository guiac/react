import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'   //Field é uma tag

import labelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleAction'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v //t é o acumulador e v é o valor atual
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum), //"+" converte uma string em valor numérico
            sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum) //transforma um array de objetos e um array de valores numéricos e depois soma
        }
    }

    render() {
        const { handleSubmit, readOnly, credits, debts } = this.props //método do redux-form
        const { sumOfCredits, sumOfDebts } = this.calculateSummary()
        return(
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name' component={labelAndInput} readOnly={readOnly}
                        label='Nome' cols='12 4' placeholder='Informe o nome' />
                    <Field name='month' component={labelAndInput} type='number' readOnly={readOnly}
                        label='Mês' cols='12 4' placeholder='Informe o mês' />
                    <Field name='year' component={labelAndInput} type='number' readOnly={readOnly}
                        label='Ano' cols='12 4' placeholder='Informe o ano' />
                    <Summary credit={sumOfCredits} debt={sumOfDebts}/>
                    <ItemList cols='12 6'list={credits} readOnly={readOnly}
                        field='credits' legend='Créditos'/>
                    <ItemList cols='12 6'list={debts} readOnly={readOnly}
                        field='debts' legend='Débitos' showStatus='true'/>
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className=' btn btn-default' onClick={this.props.init}>Cancel</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const selector = formValueSelector('billingCycleForm') //pegar algum valor dentro do formulário controlado pelo redux
const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debts: selector(state, 'debts')
})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)
//destroyOnUnmount flag do redux-form para não destruir o formulário qdo o componente for remontado