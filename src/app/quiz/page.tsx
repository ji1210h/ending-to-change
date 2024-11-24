'use client'
import Image from 'next/image'

import Question from '@/components/quiz/Question'
import Answer from '@/components/quiz/Answer'

import { useEffect, useState } from 'react'
import { getUnsolvedQuizzes } from '@/apis/quiz'

import { Database } from '@/types/supabase'

type QuizDto = Database['public']['Tables']['quiz']['Row']

export default function Page() {
  const [quizList, setQuizList] = useState<QuizDto[]>([])
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0)
  const userId = '47dd1195-11d0-4227-b42e-e7e6ad96045b' // 테스트용 사용자 ID
  const categoryId = 1 // 테스트용 카테고리 ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUnsolvedQuizzes(userId, categoryId)
        if (data.length > 0) {
          setQuizList(data)
          setCurrentQuizIndex(0)
        }
      } catch (error) {
        console.error('Error fetching unsolved quizzes:', error)
      }
    }

    fetchData()
  }, [])

  const currentQuiz = quizList[currentQuizIndex]

  console.log(currentQuiz)

  return (
    <div className="relative h-screen">
      {currentQuiz ? (
        <>
          <div className="relative z-10">
            <Question question={currentQuiz.question} />
            <Answer currentQuiz={currentQuiz} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <span className="relative -translate-y-20 font-gothic-b text-brown">
            퀴즈를 다 풀었습니다!
          </span>
        </div>
      )}
      <div className="absolute bottom-0">
        <Image
          src="/image/quiz-background.svg"
          alt=""
          width={390}
          height={217}
          layout="responsive"
        />
      </div>
    </div>
  )
}
