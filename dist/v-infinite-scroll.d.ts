import { Directive } from '../node_modules/vue';

export declare const vInfiniteScroll: Directive<HTMLElement, {
    rootMargin: string;
    threshold: number;
    wait: number;
    onComplete(): void;
}>;
