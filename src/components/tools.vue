<template>
    <n-layout embedded content-style="padding: 24px 24px 0 24px;">
        <n-tabs default-value="快速伪造记录" justify-content="space-evenly" type="line" animated>
            <n-tab-pane name="快速伪造记录" animated display-directive="show:lazy">
                <genRecord />
            </n-tab-pane>
            <n-tab-pane name="排行榜" animated display-directive="show:lazy">
                <ranking />
            </n-tab-pane>
            <n-tab-pane name="我的记录" animated display-directive="show:lazy">
                <myRecord />
            </n-tab-pane>
        </n-tabs>
    </n-layout>
</template>
  