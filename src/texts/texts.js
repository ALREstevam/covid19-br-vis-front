import React from 'react';

import { GrowthRateFormula, GrowthRate, GrGratherThenZero, GrLowerThenZero, GrApproxZero } from './mathFormulas'

export default {
    aboutSite: {
        presentation: (
            <p>
                Este site contém um conjunto de experimentos de visualização de dados sobre o COVID-19 nos municípios brasileiros.
                os dados foram extraídos de <a href='https://covid19br.wcota.me/'>https://covid19br.wcota.me/</a> e então processados no formato GEOJSON, adequado
                para a construção de mapas interativos. Mais informações no rodapé.
            </p>
        ),
        youCanDo: (
            <p>
                Navegue pelo mapa e use o zoom para selecionar uma região específica. Os gráficos abaixo se adequarão para mostrar
                os dados das regioẽs visíveis no mapa.
            </p>
        )
    },
    growthFactor: {
        mainExplanation: [
            (<p key='gr1'>
                O <strong>Fator de Crescimento</strong> (ou <em>Growth Factor</em>) reflete o crescimento percentual diário no número de casos e óbitos computados:
            </p>),
            (<p key='gr2'>
                Este valor é calculado com a seguinte fórmula: <GrowthRateFormula />
            </p>),
            (<p  key='gr3'>
                De forma especifica, o valor do <GrowthRate /> indica que o número de novos casos ou óbitos em um determinado dia pode ser obtido pela multiplicação da devida quantidade no dia anterior por <GrowthRate />.
            </p>),
        ],

        parameters: (
            <ul>
                <li><GrGratherThenZero />: quantidade casos ou óbitos aumentando, quanto maior o valor, maior o crescimento diário.</li>
                <li><GrLowerThenZero />: quantidade casos ou óbitos diminuindo, quanto menor o valor, maior é a diminuição na quantidade em comparação com o dia anterior.</li>
                <li><GrApproxZero />: a quantidade de casos ou óbitos está estável, houve redução ou pequeno aumento entre os dias.</li>
            </ul>
        ),

        about: [
            (<p key='aboutgr1'>
                O fator de crescimento é uma importante métrica na avaliação da disseminação da doença e ocorrência de mortes, mas
                é totalmente dependente da testagem em massa da população e da confirmação da causa dos óbitos onde há suspeita de COVID-19,
                assim, um aumento ou diminuição neste fator pode revelar tanto mudanças na quantidade real quanto no número de testes.
            </p>),
            (<p key='aboutgr2'>
                É importante notar também que: nas primeiras semanas da infecção a quantidade de pacientes é muito pequena para termos valores concisos, assim, há uma grande flutuação num primeiro momento e com o tempo temos uma medida mais realista.
            </p>),
            (<p key='aboutgr3'>
                De forma geral, espera-se que este valor mantenha-se acima de zero enquanto a doença estiver se alastrando, que se mantenha muito próxima ao zero quando o platô da infecção for atingido e que fique abaixo de zero durante sua redução.
            </p>)
        ],
    },
    specialChars: {
        pointUp: '˄',
        pointDown: '˅',
    },
    dataSource: {
        mainText: (
            <p>
                Fonte de dados para o mapa e os gráficos:
                <a href='https://covid19br.wcota.me/'>Número de casos confirmados de COVID-19 no Brasil</a>
            </p>
        )
    }
}

