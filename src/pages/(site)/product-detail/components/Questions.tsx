import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Questions = () => {
  const questions = [
    {
      id: 1,
      question: 'Is this product compatible with iOS devices?',
      answer: 'Yes, this product is fully compatible with all iOS devices running iOS 12 or later.'
    },
    {
      id: 2,
      question: 'What is the battery life?',
      answer: 'The battery life is approximately 8 hours of continuous use.'
    },
    {
      id: 3,
      question: 'Does it come with a warranty?',
      answer: "Yes, it comes with a 1-year limited manufacturer's warranty."
    }
  ]
  return (
    <>
      <h2 className='text-2xl font-semibold mb-4'>Frequently Asked Questions</h2>
      <Accordion type='single' collapsible className='w-full'>
        {questions.map((item) => (
          <AccordionItem key={item.id} value={`question-${item.id}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
}

export default Questions
