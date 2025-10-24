import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const categories = [
  {
    id: "category1",
    title: "Irenginiai",
    options: [
      { id: "opt1", label: "Kibiras", value: "" },
      { id: "opt2", label: "Bongas", value: "" },
      { id: "opt3", label: "Parasiutas", value: "" },
      { id: "opt4", label: "Kestas", value: "" },
    ],
  },
  {
    id: "category2",
    title: "Streinai",
    options: [
      { id: "opt1", label: "Lemoniukas", value: "" },
      { id: "opt2", label: "Trupininis", value: "" },
      { id: "opt3", label: "Dropinis", value: "" },
      { id: "opt4", label: "Runcaz", value: "" },
    ],
  },
  {
    id: "category3",
    title: "Aspinuodijimo lygis",
    options: [
      { id: "opt1", label: "Salaga", value: "" },
      { id: "opt2", label: "Megejas", value: "" },
      { id: "opt3", label: "Apsitorchines", value: "" },
      { id: "opt4", label: "Expertas", value: "" },
    ],
  },
];

export default function Home() {
  const [selections, setSelections] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (categoryId, optionId) => {
    setSelections((prev) => ({
      ...prev,
      [categoryId]: optionId,
    }));
  };

  const allSelected = categories.every((cat) => selections[cat.id]);

  const handleCalculate = () => {
    setIsModalOpen(true);
  };

  const getResult = () => {
    const count = Object.keys(selections).length;
    return `Sende tau galima ypust ${count * 3} gramus.`;
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-balance">
            <span className="text-primary">Xymkes</span>{" "}
            <span className="text-foreground">Skaiciuotuwas</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Pasirink sawo laudauta
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.id} className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {category.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.options.map((option) => {
                  const isSelected = selections[category.id] === option.id;
                  const hasSelection = !!selections[category.id];
                  const shouldBlur = hasSelection && !isSelected;

                  return (
                    <Card
                      key={option.id}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        isSelected
                          ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                          : "hover:border-primary/50"
                      } ${shouldBlur ? "opacity-40 blur-[2px] grayscale" : ""}`}
                      onClick={() => handleSelect(category.id, option.id)}
                    >
                      <div className="p-6 space-y-3">
                        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-4xl font-bold text-muted-foreground">
                            IMG
                          </span>
                        </div>
                        <p className="text-center font-medium text-card-foreground">
                          {option.label}
                        </p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Button
            size="lg"
            onClick={handleCalculate}
            disabled={!allSelected}
            className={`px-12 py-6 text-lg font-semibold transition-all duration-300 ${
              allSelected
                ? "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40"
                : ""
            }`}
          >
            Pajignali
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl text-card-foreground">
              Tawo rezultatas:
            </DialogTitle>
            <DialogDescription className="text-lg pt-4 text-card-foreground">
              {getResult()}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}
