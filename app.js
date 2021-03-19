var submitButton = document.querySelector('#app form button')
var zipCodeField= document.querySelector('#app form input')
var content= document.querySelector('#app main')


submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault()
    var zipCode = zipCodeField.value

    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.replace('-', '')
    zipCode = zipCode.trim()

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
        .then(function (response){
            
            //Se o retorno da consulta tiver propiedade com nome erro
            if (response.data.erro){
                throw new Error('CEP inválido')
            }

            //console.log(response.data)
            //Renderizar informações
            content.innerHTML = ''
            createLine(response.data.logradouro)
            createLine(response.data.bairro)
            createLine(response.data.localidade + '/ ' + response.data.uf)
        })
        .catch(function (error){
            console.log(error)
            content.innerHTML = ''
            createLine('Ops, algo deu errado!')
        })

    function createLine(text){
        var line = document.createElement('p')
        var text = document.createTextNode(text)
        //colocar texto dentro da tag p
        line.appendChild(text)
        content.appendChild(line)
    }
}