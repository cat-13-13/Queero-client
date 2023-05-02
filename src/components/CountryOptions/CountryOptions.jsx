import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Accordion, AccordionSection, Select } from 'react-rainbow-components';
import { Button } from 'react-rainbow-components';
import { ThemeContext } from "../../contexts/theme.context";

const CountryOptions = ({ resetQueries, getQueries, resetPage }) => {

    const { themeSelected } = useContext(ThemeContext)

    const resetOptions = () => {

        resetQueries()
        const form = document.getElementById('filter');
        const selectElements = form.getElementsByTagName('select');

        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].selectedIndex = 0;
        }
    }

    const handleOption = e => {

        const id = (e.target.parentNode).parentNode.id
        const { value } = e.target
        resetPage()
        getQueries({ [id]: value })

    }

    return (
        <div className="countries-list-accordion">
            <Accordion >
                <AccordionSection icon={<FontAwesomeIcon icon={faFilter} />}
                    label="Filter/Sort Countries">
                    <div className={themeSelected.theme === 'light' ? "filtering" : "filtering filtering-dark"}>
                        <div className="filtering-options" id="filter">
                            <Select
                                label="Protection against discrimination"
                                labelAlignment="left"
                                id="discriminationProtection"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: 'Constitutional protections', label: 'Constitutional protections' },
                                    { value: 'Broad protections', label: 'Broad protections' },
                                    { value: 'Limited protections', label: 'Limited protections' },
                                    { value: 'No protections', label: 'No protections' }
                                ]}
                            />
                            <Select
                                label="Criminalization against violence"
                                labelAlignment="left"
                                id="violenceCriminalization"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: 'Hate crimes', label: 'Hate crimes' },
                                    { value: 'Incitement', label: 'Incitement' },
                                    { value: 'Limited protections', label: 'Limited protections' },
                                    { value: 'No protections', label: 'No protections' }
                                ]}
                            />
                            <Select
                                label="Is it a good place to live?"
                                labelAlignment="left"
                                id="goodPlaceToLive"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: '76-100%', label: '76-100%' },
                                    { value: '51-75%', label: '51-75%' },
                                    { value: '26-50%', label: '26-50%' },
                                    { value: '0-25%', label: '0-25%' }
                                ]}
                            />
                            <Select
                                label="Propaganda/Morality Laws"
                                labelAlignment="left"
                                id="propaganda"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: 'Allowed', label: 'Allowed' },
                                    {
                                        value: 'Laws prevent the discussion of Pro-LGTBTQ+ issues',
                                        label: 'Laws prevent the discussion of Pro-LGTBTQ+ issues'
                                    },
                                ]}
                            />
                            <Select
                                label="Illegal Same-sex Relationships"
                                labelAlignment="left"
                                id="illegalSameSexRelationships"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: 'Allowed', label: 'Allowed' },
                                    {
                                        value: 'Punishments range from jail time to the death penalty',
                                        label: 'Punishments range from jail time to the death penalty'
                                    },
                                ]}
                            />
                            <Select
                                label="Transgender Legal Identity Laws"
                                labelAlignment="left"
                                id="transgenderLegal"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    {
                                        value: 'Legal to change gender without sex reassignment surgery',
                                        label: 'Legal to change gender without sex reassignment surgery'
                                    },
                                    { value: 'Illegal', label: 'Illegal' },

                                    { value: 'No information', label: 'No information' }
                                ]}
                            />
                            <Select
                                label="Calification"
                                labelAlignment="left"
                                id="calification"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: 'a', label: 'A' },
                                    { value: 'a%2D', label: 'A-' },
                                    { value: 'b%2B', label: 'B+' },
                                    { value: 'b', label: 'B' },
                                    { value: 'b%2D', label: 'B-' },
                                    { value: 'c%2B', label: 'C+' },
                                    { value: 'c', label: 'C' },
                                    { value: 'c%2D', label: 'C-' },
                                    { value: 'd%2B', label: 'D+' },
                                    { value: 'd', label: 'D' },
                                    { value: 'd%2D', label: 'D-' },
                                    { value: 'f', label: 'F' }
                                ]}
                            />

                            <Select
                                label="Sort by:"
                                labelAlignment="left"
                                id="sort"
                                defaultValue=''
                                onChange={handleOption}
                                options={[
                                    { value: '', label: 'Select Option' },
                                    { value: 'Murder0', label: 'Trans Murder Rates: Ascending' },
                                    { value: 'Murder1', label: 'Trans Murder Rates: Descending' },
                                    { value: 'Safety1', label: 'Safety Index: Ascending' },
                                    { value: 'Safety0', label: 'Safety Index: Descending' },
                                    { value: 'Name1', label: 'Name: A-Z' },
                                    { value: 'Name0', label: 'Name: Z-A' },
                                    { value: 'Score1', label: 'Score: Lowest first' },
                                    { value: 'Score0', label: 'Score: Highest first' }
                                ]}
                            />
                        </div>

                        <Button
                            label="Reset"
                            onClick={resetOptions}
                            variant="brand"
                            className="wide-btn"
                        />
                    </div>
                </AccordionSection>
            </Accordion>


        </div>
    )
}

export default CountryOptions