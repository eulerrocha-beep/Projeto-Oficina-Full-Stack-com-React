export default function MetricCard({
    titulo,

    valor,

    icon: Icon,

    crescimento,

    aumento

}) {

    return (

        <div className="cards">

            <div className="icon-area">

                <Icon
                    size={35}
                    color="#2563eb"
                />

            </div>

            <div className="info-area">

                <h3>
                    {titulo}
                </h3>

                <p>
                    {valor}
                </p>

                {crescimento !== undefined && (

                    <span
                        className={
                            aumento
                                ? 'alta'
                                : 'baixa'
                        }
                    >

                        {aumento
                            ? '📈'
                            : '📉'}

                        {' '}

                        {crescimento.toFixed(1)}%

                    </span>

                )}

            </div>

        </div>
    )
}