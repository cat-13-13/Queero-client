import { CarouselCard, CarouselImage } from 'react-rainbow-components'
import hero from '../../assets/images/bg4.jpg'
import hero2 from '../../assets/images/bg5.jpg'
import whyus from '../../assets/images/home2.webp'
import howuse from '../../assets/images/hero3.webp'
import howuse2 from '../../assets/images/hero4.webp'
import logodark from '../../assets/images/q2.png'
import logolight from '../../assets/images/logolight.png'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme.context'
import { Link } from 'react-router-dom'

const HomePage = () => {

    const { themeSelected } = useContext(ThemeContext)

    return (
        <div className={themeSelected.theme === 'light' ? 'home-page-container home-page-container-light' : 'home-page-container home-page-container-dark'}>

            <section className='home-hero'>
                <img className='home-hero-img' src={themeSelected.theme === 'light' ? hero : hero2} alt="index hero" srcset="" />
                <div className='home-slogan'>
                    <p>Stay safe,</p>
                    <div className='home-slogan-footer'>
                        <p>Stay</p>
                        <img src={logodark} alt="index hero" srcset="" /> </div>
                </div>
            </section>
            <h1>Queero provides critical information on LGBT+ safety around the world, empowering individuals to make informed decisions and travel with confidence.</h1>
            <section className={themeSelected.theme === 'light' ? 'home-middle home-middle-light' : 'home-middle home-middle-dark'}>
                <h2>Why Queero?</h2>
                <div className='home-middle-footer' >
                    <figure className='home-whyus-img'>
                        <img src={whyus} alt="" />
                    </figure>
                    <div className='home-middle-footer-text'>
                        <p>
                            At Queero, we believe that knowledge is power. Unfortunately, not everyone has access to the information they need to stay safe and protected, especially when it comes to LGBT+ rights and risks. That's why we created Queero – to provide critical information to individuals around the world who may be facing discrimination or danger.
                        </p>
                        <p>

                            Our website is a comprehensive resource for anyone who wants to learn more about LGBT+ safety around the world. Whether you're planning a trip, moving to a new country, or simply looking for information on LGBT+ rights and risks, Queero can help. Our database includes information on countries where LGBT+ individuals may face legal and societal discrimination, as well as resources for individuals who are in need of support.
                        </p>
                        <p>

                            At Queero, we believe that everyone deserves to feel safe and protected, regardless of their sexual orientation or gender identity. By providing information and resources to the LGBT+ community, we hope to empower individuals to make informed decisions and take control of their own safety. Thank you for choosing Queero as your trusted source for LGBT+ safety information.</p>
                    </div>

                </div>

            </section>

            <section className='home-footer'>
                <div className={themeSelected.theme === 'light' ? 'home-footer-content home-footer-content-light' : 'home-footer-content home-footer-content-dark'}>
                    <h2>How to use</h2>

                    <div className='home-footer-content-text'>

                        <div className='home-footer-content-text-top'>
                            <div>
                                <p>
                                    1. Go to the "Countries" page, you'll find an interactive map and a list of countries where LGBT+ individuals may face legal and societal discrimination. Click on a country to access detailed statistics and information on LGBT+ rights and risks in that location.
                                </p>
                                <p>
                                    2. Each country also has its own "Posts" page, where you can access blog posts and articles that provide more in-depth information on the LGBT+ situation in that country. You can read and comment on posts to share your thoughts and ask questions.
                                </p>
                            </div>

                            <figure className='home-howuse-img'>
                                <img src={howuse2} alt="" />
                            </figure>

                        </div>

                        <div className='home-footer-content-text-footer'>

                            <figure className='home-howuse-img'>
                                <img src={howuse} alt="" />
                            </figure>
                            <div>
                                <p>
                                    3. If you're facing discrimination or in need of support, check out our list of resources for LGBT+ individuals. We've compiled a list of organizations and groups that can provide help and support in a variety of situations.
                                </p>
                                <p>
                                    4. If you have any questions or feedback, don't hesitate to contact us! You can reach us through our contact form, or by emailing us directly at <Link>contact@queero.com</Link>.
                                </p>
                            </div>

                        </div>




                    </div>

                </div>

            </section>



        </div>
    )
}

export default HomePage
