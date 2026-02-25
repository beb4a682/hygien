import { Card, CardTitle, CardText } from '../components/ui/Card'
import type { Lecture } from '../data/lectures'
import type { Test } from '../data/tests'
import './tests.css'

type Props = {
  lectures: Lecture[]
  tests: Test[]
  onGoLectures: () => void
  onOpenTest: (testId: string) => void
}

function getLectureTitle(lectures: Lecture[], lectureId: string) {
  return lectures.find((l) => l.id === lectureId)?.title ?? 'Лекция'
}

function isLectureDone(lectures: Lecture[], lectureId: string) {
  return lectures.find((l) => l.id === lectureId)?.status === 'done'
}

export default function TestsSpisocScreen({ lectures, tests, onGoLectures, onOpenTest }: Props) {
  const total = tests.length
  const available = tests.filter((t) => isLectureDone(lectures, t.lectureId)).length

  return (
    <div className="testsPage">
      {/* ===== HERO ===== */}
      <div className="testsHero soft">
        <div className="testsHeroText">
          <div className="testsHeroTitle">Тесты</div>
          <div className="testsHeroSub">
            Открываются после прохождения
            <br />
            соответствующей лекции.
          </div>
        </div>

        <div className="testsHeroRight">
          <div className="testsAvailPill">
            <div className="testsAvailTop">
              <span className="testsAvailIcon">🐷</span>
              доступно
            </div>
            <div className="testsAvailNum">
              {available}/{total}
            </div>
          </div>

          <img className="testsHeroPig" src="/img/home/ic-tests.png" alt="" />
        </div>

        <img className="testsBubble b1" src="/img/home/bubble.png" alt="" />
        <img className="testsBubble b2" src="/img/home/bubble.png" alt="" />
        <img className="testsBubble b3" src="/img/home/bubble.png" alt="" />
        <img className="testsBubble b4" src="/img/home/bubble.png" alt="" />
      </div>

      {/* ===== RULE ===== */}
      <Card className="testsRuleCard soft">
        <CardTitle>Правило</CardTitle>
        <CardText>Сначала пройди лекцию → потом откроется тест</CardText>

        <div className="testsRuleRow">
          <span className="testsRuleCheck">✅</span>

          <button className="testsGoLecturesBtn" type="button" onClick={onGoLectures}>
            Перейти к лекциям
          </button>
        </div>
      </Card>

      {/* ===== LIST ===== */}
      <div className="testsList">
        {tests.map((t) => {
          const open = isLectureDone(lectures, t.lectureId)
          const lectureTitle = getLectureTitle(lectures, t.lectureId)
          const questionsCount = t.questions?.length ?? 0

          return (
            <div
              key={t.id}
              className={`testItemBtn ${open ? '' : 'disabled'}`}
              role="button"
              tabIndex={0}
              onClick={() => open && onOpenTest(t.id)}
              onKeyDown={(e) => {
                if (!open) return
                if (e.key === 'Enter' || e.key === ' ') onOpenTest(t.id)
              }}
              aria-label={open ? `Открыть тест ${t.title}` : `${t.title} закрыт`}
            >
              <Card className={`testItem ${open ? '' : 'locked'} soft`}>
                {/* LEFT ICON */}
                <div className="testItemMedia" aria-hidden="true">
                  <img src={(t as any).icon ?? '/img/home/ic-tests.png'} alt="" />
                </div>

                {/* RIGHT CONTENT */}
                <div className="testItemLeft">
                  <div className="testTitleRow">
                    <div className="testTitle">
                      <span className="testTitlePrefix">Тест:</span> {t.title}
                    </div>

                    <span className={`testStatusPill ${open ? 'ok' : 'lock'}`}>
                      {open ? (
                        <>
                          <span className="testStatusEmoji">✅</span> доступно
                        </>
                      ) : (
                        <>
                          <span className="testStatusEmoji">🔒</span> закрыто
                        </>
                      )}
                    </span>
                  </div>

                  <div className="testBind">
                    Привязан к лекции: <b>{lectureTitle}</b>
                  </div>

                  <div className="testMetaPill">{questionsCount} вопросов</div>

                  <div className="testDivider" />

                  <div className="testBottom">
                    {open ? (
                      <>
                        <button
                          className="testStartBtn"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            onOpenTest(t.id)
                          }}
                        >
                          Начать
                        </button>
                        <div className="testHint">Удачи!</div>
                      </>
                    ) : (
                      <>
                        <button className="testStartBtn disabled" type="button" disabled>
                          Недоступно
                        </button>
                        <div className="testHint">Сначала заверши лекцию</div>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}