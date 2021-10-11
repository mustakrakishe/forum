<x-modal id="create-topic-modal" class="modal-lg modal-dialog-scrollable">
    <x-slot name="title">{{ __('New topic') }}</x-slot>

    <form id="create-topic-form" action="{{ route('topics.store') }}" validation="{{ route('topics.validate') }}">
        @csrf

        <div class="form-group">
            <label for="topic-title" class="col-form-label">{{ __('Title') }}</label>
            <input type="text" id="topic-title" class="form-control" name="title">
        </div>

        <div class="form-group">
            <label for="topic-content" class="col-form-label">{{ __('Content') }}</label>
            <textarea id="topic-content" class="form-control" initHeight="250" name="content"></textarea>
        </div>

    </form>

    <x-slot name="footer" class="bg-dark">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Cancel') }}</button>
        <button type="button" class="btn btn-primary" onclick="Form.validate('create-topic-form')">{{ __('Create') }}</button>
    </x-slot>
</x-modal>