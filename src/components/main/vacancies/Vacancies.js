import { useEffect, useState } from 'react'
import Vacancy from './vacancy/Vacancy'
import data from '../../../utils/bd-mentor.json'

const Vacancies = () => {
  const [dataBase, setDataBase] = useState([])
  const [start, setStart] = useState(false)
  const [activeJobMentor, setActiveJobMentor] = useState(true)
  const [activeDirection, setActiveDirection] = useState(0)
  const [cardOnPage, setCardOnPage] = useState(12)
  const [hiddenButton, setHiddenButton] = useState(true)

  useEffect(() => {
    setStart(true)
    setDataBase(data.programming)
    checkHiddenButton(data.programming)
  }, [])

  const addCard = () => {
    let numberAllCardOnPage = cardOnPage + 3
    if (numberAllCardOnPage >= dataBase.length) {
      setHiddenButton(false)
    }
    setCardOnPage(numberAllCardOnPage)
  }

  const handleDirection = (numberElement, mentorDirection, reviewDirection) => {
    setActiveDirection(numberElement)
    if (activeJobMentor === true) {
      setDataBase(mentorDirection)
      checkHiddenButton(mentorDirection)
    } else {
      setDataBase(reviewDirection)
      checkHiddenButton(reviewDirection)
    }
  }

  const checkHiddenButton = (direction) => {
    direction.length > cardOnPage ? setHiddenButton(true) : setHiddenButton(false)
  }

  return (
    <section className='vacancies'>
      <h2 className='vacancies__title font_display'>Открытые предложения</h2>
      <ul className='vacancies__job-container'>
        <li
          onClick={() => {
            setActiveJobMentor(true)
            setDataBase(data.programming)
            setActiveDirection(0)
          }}
          className={activeJobMentor ? 'vacancies__job vacancies__job_active' : 'vacancies__job'}
        >
          Для наставников
        </li>
        <li
          onClick={() => {
            setActiveJobMentor(false)
            setDataBase(data.programmingReview)
            setActiveDirection(0)
          }}
          className={activeJobMentor ? 'vacancies__job' : 'vacancies__job vacancies__job_active'}
        >
          Для ревьюеров
        </li>
      </ul>
      <div className='vacancies__block-direction'>
        <ul className='vacancies__direction-container'>
          <li
            onClick={() => handleDirection(0, data.programming, data.programmingReview)}
            className={
              activeDirection === 0 ? 'vacancies__direction vacancies__direction_active' : 'vacancies__direction'
            }
          >
            Программирование
          </li>
          <li
            onClick={() => handleDirection(1, data.analytics, data.analyticsReview)}
            className={
              activeDirection === 1 ? 'vacancies__direction vacancies__direction_active' : 'vacancies__direction'
            }
          >
            Аналитика
          </li>
          <li
            onClick={() => handleDirection(2, data.design, data.designReview)}
            className={
              activeDirection === 2 ? 'vacancies__direction vacancies__direction_active' : 'vacancies__direction'
            }
          >
            Дизайн
          </li>
          <li
            onClick={() => handleDirection(3, data.marketing, data.marketingReview)}
            className={
              activeDirection === 3 ? 'vacancies__direction vacancies__direction_active' : 'vacancies__direction'
            }
          >
            Маркетинг
          </li>
          <li
            onClick={() => handleDirection(4, data.management, data.managementReview)}
            className={
              activeDirection === 4 ? 'vacancies__direction vacancies__direction_active' : 'vacancies__direction'
            }
          >
            Менеджмен
          </li>
        </ul>
        <div className='vacancies__new-vacancy'>
          <div className='vacancies__new-vacancy-logo'></div>
          <p className='vacancies__new-vacancy-text'>Новые предложения</p>
        </div>
      </div>

      {dataBase.length ? (
        <ul className='vacancies__container'>
          {start ? dataBase.slice(0, cardOnPage).map((element) => <Vacancy card={element} key={element.id} />) : ''}
        </ul>
      ) : (
        <div>
          <p className='vacancies__not-vacancy-text'>Таких вакансий пока нет 😊</p>
          <p className='vacancies__not-vacancy-text'>Чтобы посмотреть другие, поменяйте роль или направление.</p>
        </div>
      )}

      <p
        onClick={addCard}
        className={hiddenButton ? 'vacancies__button' : 'vacancies__button vacancies__button_hidden'}
      >
        Показать больше
      </p>
    </section>
  )
}

export default Vacancies
