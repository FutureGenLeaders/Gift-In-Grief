import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 0,
      theme: "Understanding Your Loss",
      question: "Which type of loss resonates most deeply with your current experience?",
      options: [
        { value: "relationship", label: "Loss of Relationship - Death, divorce, breakup, or estrangement" },
        { value: "career", label: "Loss of Career/Purpose - Job loss, retirement, or identity crisis" },
        { value: "financial", label: "Loss of Financial Security - Economic hardship or financial upheaval" },
        { value: "health", label: "Loss of Health - Illness, disability, or physical changes" },
        { value: "spiritual", label: "Loss of Spiritual Identity - Faith crisis or meaning-making challenges" },
        { value: "dreams", label: "Loss of Dreams/Future Vision - Unfulfilled goals or changed life plans" },
        { value: "safety", label: "Loss of Safety/Security - Trauma, violence, or upheaval" },
        { value: "identity", label: "Loss of Identity/Role - Life transitions or role changes" },
        { value: "multiple", label: "I'm experiencing multiple types of loss simultaneously" }
      ]
    },
    {
      id: 1,
      theme: "Embracing Change",
      question: "How do you currently relate to the impermanence and constant change in life?",
      options: [
        { value: "resistance", label: "I resist accepting that everything must change and pass away" },
        { value: "struggle", label: "I understand change intellectually but emotionally fight it" },
        { value: "acceptance", label: "I'm learning to find peace in life's natural flow of change" },
        { value: "embrace", label: "I embrace change as natural and find freedom in letting go" }
      ]
    },
    {
      id: 2,
      theme: "Seeking Understanding",
      question: "When facing your loss, how do you seek meaning and understanding?",
      options: [
        { value: "chaos", label: "Everything feels meaningless and without purpose" },
        { value: "questioning", label: "I'm searching for understanding of why this happened" },
        { value: "balance", label: "I'm learning to hold both pain and gratitude simultaneously" },
        { value: "trust", label: "I trust there's wisdom to be found in this experience" }
      ]
    },
    {
      id: 3,
      theme: "Transformation Cycles",
      question: "How do you experience the cycle of endings and new beginnings in your grief?",
      options: [
        { value: "stuck", label: "I feel trapped in the ending with no possibility of renewal" },
        { value: "seeking", label: "I sense potential for rebirth but don't know how to access it" },
        { value: "emerging", label: "I'm experiencing moments of new life emerging from my loss" },
        { value: "flowing", label: "I embrace the natural cycle of death, transformation, and rebirth" }
      ]
    },
    {
      id: 4,
      theme: "Heart Opening",
      question: "How does love and compassion manifest in your grief journey?",
      options: [
        { value: "closed", label: "My heart feels closed and protected from further pain" },
        { value: "opening", label: "I'm learning to keep my heart open despite the hurt" },
        { value: "flowing", label: "Love is beginning to flow again through my experience" },
        { value: "radiating", label: "My grief has deepened my capacity for compassion and love" }
      ]
    },
    {
      id: 5,
      theme: "Inner Guidance",
      question: "Which practice calls most strongly to your soul right now?",
      options: [
        { value: "stillness", label: "Silent reflection and mindful presence" },
        { value: "ritual", label: "Sacred ceremonies and meaningful rituals" },
        { value: "service", label: "Compassionate service to others in pain" },
        { value: "wisdom", label: "Deep study and integration of universal truths" }
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
          <Heart className="h-16 w-16 mx-auto text-purple-400 mb-6" />
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Gentle Journey Begins
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your courage in exploring your grief. Your personalized healing path has been prepared with love and wisdom.
          </p>
          <div className="space-y-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 w-full">
              Explore Your Healing Path
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
            Gentle Assessment
          </h1>
          <p className="text-gray-300 mb-6">
            Question {currentQuestion + 1} of {questions.length} - Take your time, there are no wrong answers
          </p>
          <Progress value={progress} className="mb-8" />
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardDescription className="text-purple-400 text-sm font-medium">
              {questions[currentQuestion].theme}
            </CardDescription>
            <CardTitle className="text-white text-xl leading-relaxed">
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
