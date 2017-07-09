import * as React from 'react';
import {Component} from 'react';

import {StorageInterface} from '../types';
import {Store} from 'redux';

import ProgressBar from '../components/ProgressBar';
import GameResultsTable from '../components/GameResultsTable';

import {PLAYING,RESULTS,PENDING,CORRECT,INCORRECT} from '../helpers/constants';

const shuffle = (_) => {
    let k = _.length - 1, l = _.length, r, c;

    for(; k >= 0; --k) {
        r = Math.floor(Math.random()*l);
        c = _[r];
        _[r] = _[k];
        _[k] = c;
    }

    return _;
}

const formVariantsArray = (words, groups, length) => {
    let available = words.filter(_ => groups.indexOf(_.gid) != -1);
    
    let result = [];

    while(length-- > 0) {
        available = shuffle(available);

        let variants = available.slice(0, 4);

        const sourcePair = variants[0],
              direction = sourcePair.pd,
              enru = direction == 0 ? (
                  Math.random() > 0.5
              ) : (
                  direction == 1 ? true : false
              ),
              q = enru ? sourcePair.en : sourcePair.ru,
              v = shuffle(variants),
              c = variants.indexOf(sourcePair);

        result.push({
            question: q,
            variants: v.map(_ => (
                enru ? _.ru : _.en
            )),
            correct: c
        });
    }

    return result;
}

const getResultPhrase = (result) => {
    const score = result.reduce((r, c) => c.status == CORRECT ? r + 1 : r, 0)/result.length;

    if(score < 0.2) {
        return "Очень плохо.";
    } else if(score < 0.8) {
        return "Неплохо.";
    } else {
        return "Великолепно!";
    }
}

class Game extends Component<any, any> {
    store: Store<StorageInterface>;

    constructor(props) {
        super(props);
        this.answer = this.answer.bind(this);
        this.pickAnswer = this.pickAnswer.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
        this.exit = this.exit.bind(this);
        this.nextQuad = this.nextQuad.bind(this);
        this.expireQuestion = this.expireQuestion.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.store = props.store;

        const state = this.props.store.getState(),
              list = formVariantsArray(state.pairs, state.settings.groupOptions, state.settings.gameLength);

        this.state = {
            list: list,
            quad: list[0],
            k: 0,
            total: list.length,
            result: list.map(_ => ({
                status: PENDING,
                question: _.question,
                correct: _.variants[_.correct],
                answer: null
            })),
            status: PLAYING,
            useTimer: false,
            timerStart: null,
            intervalId: null,
            timerDelay: null,
            timeLeft: null
        };
    }

    exit() {
        this.clearTimer();
        this.props.exit();
    }

    setupTimer() {
        const {settings} = this.store.getState();
        if(settings.useTimer) {
            this.setState({
                useTimer: true,
                timerStart: Date.now(),
                intervalId: setInterval(this.updateTimer, 33),
                timerDelay: settings.timerDelay,
                timeLeft: settings.timerDelay
            });
        }
    }

    clearTimer() {
        if(this.state.useTimer) {
            clearInterval(this.state.intervalId);
        }
    }

    componentDidMount() {
        this.setupTimer();
    }

    updateTimer() {
        const state = this.state,
              now = Date.now();

        if(now - state.timerDelay > state.timerStart) {
            this.expireQuestion();
        } else {
            this.setState({
                timeLeft: state.timerStart + state.timerDelay - now
            });
        }
    }

    expireQuestion() {
        this.clearTimer();
        this.answer(false, "[время истекло]");
    }

    nextQuad() {
        const {k, list} = this.state;
        this.setupTimer();
        this.setState({
            k: k + 1,
            quad: list[k + 1]
        });
    }

    pickAnswer(evt) {
        const {quad} = this.state;
        this.answer(
            Number(evt.target.name) == quad.correct,
            quad.variants[quad.correct]
        );
    }

    answer(correct, message) {
        const {k, total, quad, list, result} = this.state,
              currentResult = result[k],
              latestResult = [
                    ...result.slice(0, k),
                    {
                        ...currentResult,
                        status: correct ? CORRECT : INCORRECT,
                        answer: message
                    },
                    ...result.slice(k + 1)
              ];

        this.clearTimer();

        if(k + 1 >= total) {
            this.setState({
                status: RESULTS,
                resultPhrase: getResultPhrase(latestResult),
                result: latestResult
            });
        } else {
            this.setState({
                result: latestResult
            });

            this.nextQuad();
        }
    }

    render() {
        if(this.state.status == PLAYING) {
            return <div className="mmrz__screen">
                <div className="grid">
                    <div className="left">
                        {this.state.quad.question} - ? 
                    </div>

                    <div className="right">
                        {
                            this.state.useTimer ? (
                                <b>{(this.state.timeLeft/1000.0).toFixed(1)}</b>
                            ) : (
                                <span></span>
                            )
                        }
                    </div>
                </div>

                {
                    this.state.quad.variants.map((_, i) => (
                        <div key={i}><input type="button" className="blue" name={String(i)} onClick={this.pickAnswer} value={_} /></div>
                    ))
                }

                <ProgressBar progress={this.state.result.map(({status}) => status)}/>
                <div className="pull-right">
                    <input type="button" className="red" onClick={this.exit} value="Закончить" />
                </div>
            </div>;
        } else {
            return <div className="mmrz__screen">
                <h1>Результаты</h1>
                <p><i>{this.state.resultPhrase}</i></p>
                <GameResultsTable results={this.state.result} />
                <ProgressBar progress={this.state.result.map(({status}) => status)}/>
                <div className="pull-right">
                    <input type="button" className="green" onClick={this.exit} value="OK" />
                </div>
            </div>;
        }
    }
}

export default Game;
