import type { Component, ComponentProps, SvelteComponent } from "svelte"

type PartProps<C extends SvelteComponent | Component> = Partial<ComponentProps<C>>

export type { PartProps as default }
