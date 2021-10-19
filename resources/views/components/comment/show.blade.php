<x-comment.layout :author="$comment->author">

    <div name="header" class="d-flex m-0 text-muted small">
        <div>{{ __('Created at') }}: {{ $comment->created_at }}</div>

        <div class="ml-4">
            @isset($comment->updated_at)
            {{ __('Updated at') }}: {{ $comment->updated_at }}
            @endisset
        </div>

        @if($comment->author->is(Auth::user()))
        <div class="ml-auto">
            <a href="#" class="card-link">{{ __('actions.edit') }}</a>
            <a href="#" class="card-link">{{ __('actions.delete') }}</a>
        </div>
        @endif
    </div>

    <div name="body" class="row m-0 my-2">
        <x-textarea class="col p-0 border-0 bg-transparent text-justify" style="resize: none;" disabled>{{ $comment->text }}</x-textarea>
    </div>

    @auth
    <div class="row m-0">
        <form name="create-comment-form" action="{{ route('topics.comments.create', ['topic' => $comment->topic_id, 'answerToId' => $comment->id]) }}">
            <x-button class="btn-link mb-n2 p-0 border-0">
                <p class="m-0 small">{{ __('actions.answer') }}</p>
            </x-button>
        </form>
    </div>
    @endauth

</x-comment.layout>