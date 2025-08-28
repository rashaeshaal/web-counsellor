import { GenezioDeploy } from "@genezio/types";
import { Problem } from "./problem";
import * as fs from "fs";
import * as path from "path";

@GenezioDeploy()
export class ProblemService {
    problems: Problem[] = [];
    private imagePath = "./media/problems";

    constructor() {
        this.problems = [
            {
                id: 1,
                title: "Test Problem 1",
                description: "Test Description 1",
            },
            {
                id: 2,
                title: "Test Problem 2",
                description: "Test Description 2",
            },
        ];
    }

    getAll(): Problem[] {
        return this.problems;
    }

    getById(id: number): Problem | undefined {
        return this.problems.find((problem) => problem.id === id);
    }

    create(problem: Problem): Problem {
        problem.id = this.problems.length + 1;
        if (problem.image) {
            problem.image = this.saveImage(problem.image);
        }
        this.problems.push(problem);
        return problem;
    }

    update(id: number, problem: Problem): Problem | undefined {
        const index = this.problems.findIndex((p) => p.id === id);
        if (index !== -1) {
            if (problem.image && problem.image.startsWith('data:')) {
                problem.image = this.saveImage(problem.image);
            }
            this.problems[index] = problem;
            return problem;
        }
    }

    delete(id: number): void {
        const index = this.problems.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.problems.splice(index, 1);
        }
    }

    private saveImage(base64Image: string): string {
        const imageName = `${Date.now()}.png`;
        const imagePath = path.join(this.imagePath, imageName);
        const imageBuffer = Buffer.from(base64Image.split(",")[1], "base64");
        fs.writeFileSync(imagePath, imageBuffer);
        return `media/problems/${imageName}`;
    }
}