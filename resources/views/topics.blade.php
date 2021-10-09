<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Topics') }}
        </h2>
        
        <x-button>
            <i class="fas fa-plus mr-4"></i>
            {{ __('pages/topics.Create new') }}
        </x-button>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 bg-white border-b border-gray-200">
                    Перечень тем
                </div>
            </div>
        </div>
    </div>
</x-app-layout>