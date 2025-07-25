import React, { useEffect, useMemo, useState } from 'react';
import '../../styles.css'
import QuestionService from '../../services/QuestionService';
import AnswerService from '../../services/AnswerService';
import useSound from 'use-sound';
import open from './line_open.mp3';


const QuestionComponent = React.memo(({ questionPack, round, roomCode, socket }) => {
  const [questionData, setQuestionData] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [playOpen] = useSound(open, {
    playbackRate: 0.75,
    volume: 0.5,
    soundEnabled: true,
  });

  playOpen()

  const fetchQuestion = async () => {
    try {
      const [questionDataResponse, answerStatusResponse] = await Promise.all([
        QuestionService.get({ round, questionPack }),
        AnswerService.get({ round, roomCode }),
      ]);

      if (questionDataResponse?.data && answerStatusResponse?.data) {
        setQuestionData(questionDataResponse.data);
        setAnswerStatus(answerStatusResponse.data);
      } else {
        console.error('Invalid response data:', questionDataResponse, answerStatusResponse);
      }
    } catch (error) {
      console.error('Error fetching question or answer status:', error);
    }
  };

  const handleUpdateAnswer = () => {
    socket.on('updateAnswer', async () => {
      playOpen({ forceSoundEnabled: true });
      try {
      } catch (error) {
        console.error(error);
      }

      await fetchQuestion();
    });
  };

  useEffect(() => {
    fetchQuestion();
    handleUpdateAnswer();
    return () => {
      socket.off('updateAnswer', handleUpdateAnswer);
    };
  }, []);

  const questionAnswers = useMemo(() => {
    if (!questionData || !answerStatus) {
      return [];
    }

    return questionData.answers.map((answer, index) => ({
      ...answer,
      isOpen: answerStatus.find((el) => el.answer === index + 1).isOpen,
    }));
  }, [questionData, answerStatus]);

  return (
    <div>
      <div className='question'>{questionData?.text}</div>
      <div className='main-wrapper'>
        <div className='answer-wrapper'>
          {questionAnswers.slice(0, 3).map((answer, index) => (
            <div className='answer-wrapper' key={index}>
              {answer.isOpen ? (
                <div className='answer show'>
                  <div className='text'>{answer.text}</div>
                  <div className='points'>{answer.points}</div>
                </div>
              ) : (
                <div className='answer hidden'>
                  <div className='hidden-text'>{index + 1}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='answer-wrapper'>
          {questionAnswers.slice(3, 6).map((answer, index) => (
            <div className='answer-wrapper' key={index}>
              {answer.isOpen ? (
                <div className='answer show'>
                  <div className='text'>{answer.text}</div>
                  <div className='points'>{answer.points}</div>
                </div>
              ) : (
                <div className='answer hidden'>
                  <div className='hidden-text'>{index + 4}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default QuestionComponent;

