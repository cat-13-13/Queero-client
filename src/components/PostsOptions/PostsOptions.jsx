import { useContext, useEffect, useState } from "react"
import postsService from "../../services/posts.service"
import { Accordion, AccordionSection, Select, Button } from 'react-rainbow-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "../../contexts/theme.context";


const PostsOptions = ({ country, filterPosts }) => {

    const { themeSelected } = useContext(ThemeContext)
    const [queries, setQueries] = useState({ sort: {} })
    useEffect(() => {

        getPosts(queries)

    }, [queries])

    const getPosts = queries => {

        postsService
            .getPosts(country, queries)
            .then(({ data }) => filterPosts(data))
            .catch(err => console.log(err))

    }

    const resetOptions = () => {

        setQueries({ sort: {} })

        const form = document.getElementById('options');
        const selectElements = form.getElementsByTagName('select');
        for (let i = 0; i < selectElements.length; i++) {
            selectElements[i].selectedIndex = 0;
        }

    }

    const getQueries = (newQuery) => {

        if (!newQuery) setQueries({ ...queries })
        else {
            newQuery === "alphabetic1"
                ? setQueries({ sort: { title: 1 } })
                : newQuery === "alphabetic0"
                    ? setQueries({ sort: { title: -1 } })
                    : newQuery === "score1"
                        ? setQueries({ sort: { score: 1 } })
                        : setQueries({ sort: { score: -1 } })
        }
    }


    const handleOption = e => {

        const { value } = e.target

        getQueries(value)

    }



    return (
        <div className="post-sorting">
            <Accordion >
                <AccordionSection
                    className="post-accordion"
                    icon={<FontAwesomeIcon icon={faFilter} />}
                    label="Sort Posts">
                    <div id='options' className="country-posts-options">
                        <Select
                            label="Sort by:"
                            labelAlignment="left"
                            id="alphabetic"
                            defaultValue=''
                            onChange={handleOption}
                            options={[
                                { value: '', label: 'Select Option' },
                                { value: 'alphabetic1', label: 'A-Z' },
                                { value: 'alphabetic0', label: 'Z-A' },
                                { value: 'score1', label: 'Lowest first' },
                                { value: 'score0', label: 'Highest first' }
                            ]}
                        />
                    </div>

                    <Button
                        label="Reset"
                        onClick={resetOptions}
                        variant="brand"
                        className={themeSelected.theme === 'light' ? "wide-btn" : "wide-btn wide-btn-dark"}
                    />

                </AccordionSection>
            </Accordion >
        </div>
    )
}

export default PostsOptions