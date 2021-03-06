import React from 'react'
import SimpleLink from './Link'

export default function Footer() {
    return (
        <div className='footer'>

            <strong style={{'fontSize': '1.2em'}}>Importante:</strong>

            <p>
            <strong>Este é apenas um experimento em visualização de dados.</strong>
            </p>

            <p>Não sou especialista em visualização de dados nem em disseminação de doenças, então
            não confie nos dados deste site, é apenas uma tentativa de visualizar a disseminação
            da doença e pode (certamente não) corresponder com a realdade.</p>
            
            <p>
            Então lembre-se de considerar que qualquer dado pode parecer mais ou menos alarmante 
            dependendo da forma como é apresentado e que eu não tenho a competência necessária
            para availiar isso de forma totalmente correta.
            </p>

            <p>
            Sugestões ou correções podem ser enviadas pelo GitHub (link a seguir).
            </p>

            <hr/>

            <p>
                <strong>Meu perfil no GitHub:  </strong>

                <SimpleLink url='https://github.com/ALREstevam' />
            </p>
            
            <p>
                <strong>Repositórios deste projeto no GitHub:  </strong>
                <SimpleLink url='https://github.com/ALREstevam/covid19-br-vis-back'/>
                <span> e </span>
                <SimpleLink url='https://github.com/ALREstevam/covid19-br-vis-back'/>
                <span>.</span>
            </p>
            
        </div>
    )
}
