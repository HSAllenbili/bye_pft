<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
                <n-tabs default-value="伪造记录" justify-content="space-evenly" type="line" animated>
                    <n-tab-pane name="伪造记录" animated display-directive="show">
                        <genRecord />
                    </n-tab-pane>
                    <n-tab-pane name="我的记录" animated display-directive="show">
                        <myRecord />
                    </n-tab-pane>
                </n-tabs>
    </n-layout>
</template>
  