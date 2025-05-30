"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../_components/Dialog_2";

type AnimationType = "dropIn" | "zoomBounce" | "slideDiagonal";

export default function Example_2() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationType>("dropIn");

  const animations: AnimationType[] = ["dropIn", "zoomBounce", "slideDiagonal"];

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 max-w-5xl mx-auto">
      <div className="space-y-3 sm:space-y-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Dialog 2 Animations</h2>
        <div className="flex flex-wrap gap-2">
          {animations.map((animation) => (
            <button
              key={animation}
              onClick={() => setCurrentAnimation(animation)}
              className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                currentAnimation === animation
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {animation}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <Dialog>
          <DialogTrigger onClick={() => setIsDialogOpen(true)}>
            <span className="block text-sm sm:text-base">Open Dialog with {currentAnimation} animation</span>
          </DialogTrigger>
          <DialogContent
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            animationType={currentAnimation}
            className="w-[95%] max-w-[95%] sm:max-w-[85%] md:max-w-md p-3 sm:p-4 md:p-6"
          >
            <DialogHeader>
              <DialogTitle>Welcome to Dialog_2</DialogTitle>
              <DialogDescription>
                This dialog features unique animations and a purple theme. Current animation: {currentAnimation}
              </DialogDescription>
            </DialogHeader>
            <div className="my-3 sm:my-4 md:my-6">
              <p className="text-gray-700 text-center text-sm sm:text-base">
                Dialog_2 features:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600 text-center text-sm sm:text-base">
                <li>Unique animations: dropIn, zoomBounce, and slideDiagonal</li>
                <li>Purple-themed design</li>
                <li>Centered content layout</li>
                <li>Larger padding and rounded corners</li>
                <li>Enhanced shadow effects</li>
              </ul>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="w-full sm:w-auto bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsDialogOpen(false);
                  alert("Action confirmed!");
                }}
                className="w-full sm:w-auto bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 text-sm sm:text-base"
              >
                Confirm
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <div className="hidden sm:block text-sm bg-purple-50 p-3 rounded-lg text-purple-700 max-w-xs">
          <p>Dialog_2 showcases a centered layout with purple accents and smooth animations.</p>
        </div>
      </div>
      
      <div className="sm:hidden text-sm bg-purple-50 p-3 rounded-lg text-purple-700">
        <p>Dialog_2 showcases a centered layout with purple accents and smooth animations.</p>
      </div>
    </div>
  );
}
