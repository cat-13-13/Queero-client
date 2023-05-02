import { ResponsiveChoropleth } from '@nivo/geo'
import React from 'react'
import data from './data.json'
import countries from './features.json'

const MyResponsiveChoropleth = ({ data, domain, onClick }) => (
    <ResponsiveChoropleth
        data={data}
        domain={domain}
        features={countries.features}
        colors="nivo"
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionTranslation={[0.5, 0.7]}
        projectionScale={150}  // Adjust the zoom level
        enableGraticule={false}
        graticuleLineColor="#DDDDDD"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
            {
                anchor: "bottom-left",
                direction: "column",
                justify: true,
                translateX: 20,
                translateY: -7,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#444444",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemTextColor: "#000000",
                            itemOpacity: 1
                        }
                    }
                ],
            }
        ]}
        onClick={onClick}

    />
);



const Nivo = ({ showCountry }) => {

    const handleMapClick = (feature) => {
        if (feature.properties.alpha3Code !== 'NODATA') showCountry(feature.properties.alpha3Code);
    }

    return (
        <div className='nivo-map'>
            <MyResponsiveChoropleth
                data={data}
                domain={[-200, 383]}
                onClick={handleMapClick}
            />
        </div>

    )
}




export default Nivo
