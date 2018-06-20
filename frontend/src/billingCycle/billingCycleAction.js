import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'


const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request    //dentro do request eu tenho um atributo chamado .data
    }
}
export function create(values) {
    return submit(values, 'post')

}

export function update(values) {
    return submit(values,'put')
}

export function remove(values) {
    return submit(values,'delete')
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values) //executa o post e depois realiza as ações
        .then(resp => {
            toastr.success('Sucesso', 'Operação Realizada com Sucesso.')
            dispatch(init())
        })
        .catch(e => {   //qdo o banco acusar algum erro
            e.response.data.errors.forEach(error => toastr.error('Erro', error)) //errors é do backend..forEach percorre a matriz de erros
        })
    }
}

export function showUpdate(billingCycle) {
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle) //inicializar o formulário com dados já cadastrados
    ]
}

export function showDelete(billingCycle) { //refazer, colocar o id da aba.. o código está duplicado
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle) //inicializar o formulário com dados já cadastrados
    ]
}

export function init(){
    return [
        showTabs('tabList','tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES) //inicializar o formulário com dados já cadastrados
    ]
}
