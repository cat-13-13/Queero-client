import { faEdit, faHeart, faPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { Accordion, AccordionSection, Avatar, Button, Select } from 'react-rainbow-components'
import aboutUs from '../../assets/images/aboutus.png'
import cata from '../../assets/images/IMG_0255.jpg'
import juan from '../../assets/images/IMG_0269.jpg'
import { ThemeContext } from '../../contexts/theme.context'

const AboutUsPage = () => {

    const { themeSelected } = useContext(ThemeContext)

    return (
        <div className={themeSelected.theme === 'light' ? 'aboutus-container aboutus-container-light' : 'aboutus-container aboutus-container-dark'}>
            <div className='aboutus-hero'>
                <h1>Meet Our Team</h1>
                <div className='aboutus-image' >
                    <img src={aboutUs} alt="about us illustration" />
                </div>
            </div>


            <div className={themeSelected.theme === 'light' ? 'aboutus-info aboutus-info-light' : 'aboutus-info aboutus-info-dark'}>
                <div className='creator'>
                    <div className='creator-img'>

                        <img src={cata} alt="Catalina Fernández" />
                    </div>
                    <h4>Catalina Fernández</h4>
                    <p>Junior Full Stack Developer with knowledge in front-end technologies HTML, including HTML Canvas, CSS, Javascript and frameworks such as React, and back-end technologies NodeJS and ExpressJS and MongoDB for API development.
                        <br />

                        Background in Dramatic Arts resulting in good social skills, such as communication and team work. She always had interest in mathematics and after knowing some people involved in web development,  she decided to start her path in this world in Ironhack. Both analytical and creative skills acquired during education resulting in an interest in both front and back-end projects, although slightly inclined towards front-end.</p>
                </div>

                <div className='creator'>
                    <div className='creator-img'>

                        <img src={juan} alt="Juan Rodríguez" />
                    </div>
                    <h4>Juan Rodríguez</h4>
                    <p>Technology enthusiast from Venezuela, currently living in Spain. Despite working in the hospitality industry since he arrived in Spain, he's always had a keen interest in web development and programming.<br />

                        In his free time, he's been teaching himself the basics of JavaScript, HTML, and CSS. Recently, he completed a full stack developer bootcamp, where he learned React, Javascript (ES6), NodeJS, MongoDB, Express, HTML, and CSS.<br />

                        He is a person committed to his personal and professional growth, always looking for opportunities to improve and expand his skills in the technology industry. He is passionate about this field and dedicated to continuing to learn and grow in it.</p>
                </div>

            </div>






        </div>
    )
}
export default AboutUsPage