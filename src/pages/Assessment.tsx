
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Assessment = () => {
  const { t } = useTranslation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const questions = [
    {
      id: 0,
      theme: t("assessment.questions.0.theme").toString() || "Understanding Your Loss",
      question: t("assessment.questions.0.question").toString() || "Which type of loss resonates most deeply with your current experience?",
      options: [
        { value: "relationship", label: t("assessment.questions.0.options.relationship").toString() || "Loss of Relationship - Death, divorce, breakup, or estrangement" },
        { value: "career", label: t("assessment.questions.0.options.career").toString() || "Loss of Career/Purpose - Job loss, retirement, or identity crisis" },
        { value: "financial", label: t("assessment.questions.0.options.financial").toString() || "Loss of Financial Security - Economic hardship or financial upheaval" },
        { value: "health", label: t("assessment.questions.0.options.health").toString() || "Loss of Health - Illness, disability, or physical changes" },
        { value: "spiritual", label: t("assessment.questions.0.options.spiritual").toString() || "Loss of Spiritual Identity - Faith crisis or meaning-making challenges" },
        { value: "dreams", label: t("assessment.questions.0.options.dreams").toString() || "Loss of Dreams/Future Vision - Unfulfilled goals or changed life plans" },
        { value: "safety", label: t("assessment.questions.0.options.safety").toString() || "Loss of Safety/Security - Trauma, violence, or upheaval" },
        { value: "identity", label: t("assessment.questions.0.options.identity").toString() || "Loss of Identity/Role - Life transitions or role changes" },
        { value: "multiple", label: t("assessment.questions.0.options.multiple").toString() || "I'm experiencing multiple types of loss simultaneously" }
      ]
    },
    {
      id: 1,
      theme: t("assessment.questions.1.theme").toString() || "Embracing Change",
      question: t("assessment.questions.1.question").toString() || "How do you currently relate to the impermanence and constant change in life?",
      options: [
        { value: "resistance", label: t("assessment.questions.1.options.resistance").toString() || "I resist accepting that everything must change and pass away" },
        { value: "struggle", label: t("assessment.questions.1.options.struggle").toString() || "I understand change intellectually but emotionally fight it" },
        { value: "acceptance", label: t("assessment.questions.1.options.acceptance").toString() || "I'm learning to find peace in life's natural flow of change" },
        { value: "embrace", label: t("assessment.questions.1.options.embrace").toString() || "I embrace change as natural and find freedom in letting go" }
      ]
    },
    {
      id: 2,
      theme: t("assessment.questions.2.theme").toString() || "Seeking Understanding",
      question: t("assessment.questions.2.question").toString() || "When facing your loss, how do you seek meaning and understanding?",
      options: [
        { value: "chaos", label: t("assessment.questions.2.options.chaos").toString() || "Everything feels meaningless and without purpose" },
        { value: "questioning", label: t("assessment.questions.2.options.questioning").toString() || "I'm searching for understanding of why this happened" },
        { value: "balance", label: t("assessment.questions.2.options.balance").toString() || "I'm learning to hold both pain and gratitude simultaneously" },
        { value: "trust", label: t("assessment.questions.2.options.trust").toString() || "I trust there's wisdom to be found in this experience" }
      ]
    },
    {
      id: 3,
      theme: t("assessment.questions.3.theme").toString() || "Transformation Cycles",
      question: t("assessment.questions.3.question").toString() || "How do you experience the cycle of endings and new beginnings in your grief?",
      options: [
        { value: "stuck", label: t("assessment.questions.3.options.stuck").toString() || "I feel trapped in the ending with no possibility of renewal" },
        { value: "seeking", label: t("assessment.questions.3.options.seeking").toString() || "I sense potential for rebirth but don't know how to access it" },
        { value: "emerging", label: t("assessment.questions.3.options.emerging").toString() || "I'm experiencing moments of new life emerging from my loss" },
        { value: "flowing", label: t("assessment.questions.3.options.flowing").toString() || "I embrace the natural cycle of death, transformation, and rebirth" }
      ]
    },
    {
      id: 4,
      theme: t("assessment.questions.4.theme").toString() || "Heart Opening",
      question: t("assessment.questions.4.question").toString() || "How does love and compassion manifest in your grief journey?",
      options: [
        { value: "closed", label: t("assessment.questions.4.options.closed").toString() || "My heart feels closed and protected from further pain" },
        { value: "opening", label: t("assessment.questions.4.options.opening").toString() || "I'm learning to keep my heart open despite the hurt" },
        { value: "flowing", label: t("assessment.questions.4.options.flowing").toString() || "Love is beginning to flow again through my experience" },
        { value: "radiating", label: t("assessment.questions.4.options.radiating").toString() || "My grief has deepened my capacity for compassion and love" }
      ]
    },
    {
      id: 5,
      theme: t("assessment.questions.5.theme").toString() || "Inner Guidance",
      question: t("assessment.questions.5.question").toString() || "Which practice calls most strongly to your soul right now?",
      options: [
        { value: "stillness", label: t("assessment.questions.5.options.stillness").toString() || "Silent reflection and mindful presence" },
        { value: "ritual", label: t("assessment.questions.5.options.ritual").toString() || "Sacred ceremonies and meaningful rituals" },
        { value: "service", label: t("assessment.questions.5.options.service").toString() || "Compassionate service to others in pain" },
        { value: "wisdom", label: t("assessment.questions.5.options.wisdom").toString() || "Deep study and integration of universal truths" }
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
            {t("assessment.complete.title") ? t("assessment.complete.title").toString() : "Your Gentle Journey Begins"}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {t("assessment.complete.description") ? t("assessment.complete.description").toString() : "Thank you for your courage in exploring your grief. Your personalized healing path has been prepared with love and wisdom."}
          </p>
          <div className="space-y-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 w-full">
              {t("assessment.complete.button") ? t("assessment.complete.button").toString() : "Explore Your Healing Path"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/">
              <Button variant="outline" size="lg" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 w-full">
                {t("assessment.complete.home") ? t("assessment.complete.home").toString() : "Return to Home"}
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
            {t("assessment.back") ? t("assessment.back").toString() : "Back to Home"}
          </Link>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {t("assessment.title") ? t("assessment.title").toString() : "Gentle Assessment"}
          </h1>
          <p className="text-gray-300 mb-6">
            {t("assessment.questionCounter", { current: currentQuestion + 1, total: questions.length }).toString() || `Question ${currentQuestion + 1} of ${questions.length} - Take your time, there are no wrong answers`}
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
                {t("assessment.previous") ? t("assessment.previous").toString() : "Previous"}
              </Button>
              <Button 
                onClick={nextQuestion}
                disabled={!answers[currentQuestion]}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {currentQuestion === questions.length - 1 
                  ? (t("assessment.completeAssessment") ? t("assessment.completeAssessment").toString() : "Complete Assessment")
                  : (t("assessment.next") ? t("assessment.next").toString() : "Next")
                }
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

