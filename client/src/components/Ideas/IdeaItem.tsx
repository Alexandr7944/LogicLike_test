import type {Idea} from "../../interfaces/Idea.ts";
import {Button, Card} from "react-bootstrap";

type IdeaItemProps = {
    idea: Idea,
    index: number,
    voteForIdea(id: number, index: number): void
}

export function IdeaItem({idea, index, voteForIdea}: IdeaItemProps) {
    return (
        <Card className={"mb-3 "}>
            <Card.Body className={"d-flex justify-content-between align-items-center"}>
                <div>
                    <Card.Title>{idea.title}</Card.Title>
                    <Card.Text>{idea.description}</Card.Text>
                </div>
                <Button
                    variant="light"
                    onClick={() => voteForIdea(idea.id, index)}
                    // disabled={idea.isVoted}
                >
                    {idea.votesCount}
                    <i
                        className={`ms-2 bi bi-hand-thumbs-up${idea.isVoted ? '-fill' : ''}`}
                        style={{fontSize: "1.2rem"}}
                    />
                </Button>
            </Card.Body>
        </Card>
    )
}
