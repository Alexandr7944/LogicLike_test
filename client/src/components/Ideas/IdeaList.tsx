import {useEffect, useState} from "react";
import Loader from "../Loader/Loader.tsx";
import type {Idea} from "../../interfaces/Idea.ts";
import {IdeaItem} from "./IdeaItem.tsx";
import {ErrorMessage} from "../ErrorMessage.tsx";

export const IdeaList = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const serverURL = import.meta.env.MODE === "production"
        ? ''
        : import.meta.env.VITE_URL_DEV_API;

    useEffect(() => {
        fetchIdeas();
    }, [])

    async function fetchIdeas() {
        setLoading(true);
        try {
            const response = await fetch(`${serverURL}/ideas`);
            if (!response.ok) {
                setErrorMessage(response.statusText ?? 'Something went wrong!')
            } else {
                const data: Idea[] = await response.json();
                if (data.length > 0)
                    setIdeas(data);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    async function voteForIdea(ideaId: number, index: number) {
        try {
            const response = await fetch(`${serverURL}/vote`, {
                method:  'POST',
                body:    JSON.stringify({ideaId}),
                headers: {'Content-Type': 'application/json'}
            });
            if (!response.ok) {
                setErrorMessage(() => response.status === 409
                    ? 'Вы уже проголосовали за эту идею или превышен лимит голосов'
                    : response.statusText);
                setTimeout(() => setErrorMessage(() => null), 5000);
            } else {
                setIdeas(prevIdeas => {
                    const newIdeas = [...prevIdeas];
                    ++newIdeas[index].votesCount;
                    newIdeas[index].isVoted = true;
                    return newIdeas.sort((a, b) => b.votesCount - a.votesCount);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className={"text-center mb-4"}>Список идей</h1>
            <ErrorMessage
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
            />
            <Loader showLoader={loading}/>
            <div>
                {
                    ideas.map((idea, index) =>
                        <IdeaItem
                            key={idea.id}
                            idea={idea}
                            index={index}
                            voteForIdea={voteForIdea}
                        />
                    )
                }
            </div>
        </div>
    )
}
