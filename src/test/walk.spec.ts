
// importするモジュールを変数に割り当てる
import * as walkModule from './walk';

describe('walkFast関数のモック化テスト', () => {
    test('モック化できているか', () => {
        // spyOnすることによって、該当関数の型がspyInplementationに変化します。
        // mockReturnValueOnceによって自由にモック化できます。
        // jest.spyOnだけでは、実際の関数（モック化されていない関数）が実行されるので注意
        const walkSpy = jest.spyOn(walkModule, 'walkFast').mockReturnValueOnce('walk slow');

        expect(walkModule.walkFast()).toBe('walk slow');
        expect(walkSpy).toHaveBeenCalled();
    });
    it('テスト', () => {
        jest.spyOn(walkModule, 'aoki').mockReturnValueOnce('答え');
        expect(walkModule.aoki(3)).toBe('答え')

    })
});