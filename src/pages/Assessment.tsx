
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Flower2, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 0,
      tradition: "Buddhist Wisdom",
      question: "How do you currently relate to the impermanence of life and loss?",
      options: [
        { value: "denial", label: "I resist accepting that everything must change and pass away" },
        { value: "struggle", label: "I intellectually understand impermanence but emotionally fight it" },
        { value: "acceptance", label: "I'm learning to find peace in life's constant flow of change" },
        { value: "wisdom", label: "I embrace impermanence as the natural order and find freedom in it" }
      ]
    },
    {
      id: 1,
      tradition: "Maat's Balance",
      question: "When facing loss, how do you seek truth and justice in your experience?",
      options: [
        { value: "chaos", label: "Everything feels unfair and without meaning or purpose" },
        { value: "questioning", label: "I'm searching for understanding of why this happened" },
        { value: "balance", label: "I'm learning to hold both pain and gratitude simultaneously" },
        { value: "cosmic", label: "I trust in a greater cosmic order beyond my understanding" }
      ]
    },
    {
      id: 2,
      tradition: "Auset's Resurrection",
      question: "How do you experience the cycle of death and rebirth in your grief?",
      options: [
        { value: "stuck", label: "I feel trapped in death with no possibility of renewal" },
        { value: "seeking", label: "I sense potential for rebirth but don't know how to access it" },
        { value: "emerging", label: "I'm experiencing moments of new life emerging from my loss" },
        { value: "embodying", label: "I fully embrace the sacred cycle of death, transformation, and rebirth" }
      ]
    },
    {
      id: 3,
      tradition: "Christ Consciousness",
      question: "How does unconditional love and forgiveness manifest in your grief journey?",
      options: [
        { value: "closed", label: "My heart feels closed and hardened by pain" },
        { value: "opening", label: "I'm struggling to forgive and love through my suffering" },
        { value: "flowing", label: "Love is beginning to flow again despite my pain" },
        { value: "radiating", label: "My grief has deepened my capacity for unconditional love" }
      ]
    },
    {
      id: 4,
      tradition: "Integration",
      question: "Which sacred practice calls most strongly to your soul right now?",
      options: [
        { value: "meditation", label: "Silent meditation and mindfulness practices" },
        { value: "ritual", label: "Sacred ceremonies and symbolic rituals" },
        { value: "service", label: "Compassionate service to others in pain" },
        { value: "study", label: "Deep study of spiritual texts and wisdom teachings" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Flower2 className="h-16 w-16 mx-auto text-purple-400 mb-6" />
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Sacred Assessment is Complete
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your personalized grief transformation journey has been prepared based on your responses.
          </p>
          <div className="space-y-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 w-full">
              View Your Sacred Path
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/">
              <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 w-full">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sacred Grief Assessment
          </h1>
          <p className="text-gray-300 mb-6">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <Progress value={progress} className="mb-8" />
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardDescription className="text-purple-400 text-sm font-medium">
              {questions[currentQuestion].tradition}
            </CardDescription>
            <CardTitle className="text-white text-xl">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label htmlFor={option.value} className="text-gray-300 cursor-pointer leading-relaxed">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className="border-slate-600 text-gray-400 hover:bg-slate-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
